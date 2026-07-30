'use client'
import { useEffect, useState, useCallback } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '../lib/supabase'
import {
  COMMITMENTS, WEEKLY_COMMITMENTS, WEEKLY_VERSES, FRUIT_DATA, APPROACH_NAMES,
  today, parseLocalDate, dayNumber, weekNumber, dayKey, formatDate, weekRange, localDateStr
} from '../lib/data'
import StandardScreen from './StandardScreen'
import TodayTab from './TodayTab'
import WeeklyTab from './WeeklyTab'
import JourneyTab from './JourneyTab'
import PromiseTab from './PromiseTab'
import ShareModal from './ShareModal'
import InstallScreen from './InstallScreen'
import NourishScreen from './NourishScreen'
import DayCompleteScreen from './DayCompleteScreen'
import HelpScreen from './HelpScreen'

type Tab = 'today' | 'weekly' | 'journey' | 'promise'

interface Profile {
  name: string | null
  start_date: string | null
  nutrition_approach: string | null
  nutrition_declaration: string | null
}

interface AppProps { user: User }

export default function App({ user }: AppProps) {
  const supabase = createClient()

  const [profile, setProfile] = useState<Profile>({ name: null, start_date: null, nutrition_approach: null, nutrition_declaration: null })
  const [completions, setCompletions] = useState<Record<string, Record<string, boolean>>>({})
  const [weeklyData, setWeeklyData] = useState<Record<number, Record<string, boolean>>>({})
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('today')
  const [curDay, setCurDay] = useState(1)
  const [curWeek, setCurWeek] = useState(1)
  const [showStandard, setShowStandard] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showInstall, setShowInstall] = useState(false)
  const [showNourish, setShowNourish] = useState(false)
  const [showDayComplete, setShowDayComplete] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [completedDay, setCompletedDay] = useState(1)
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    const [profileRes, completionsRes, weeklyRes] = await Promise.all([
      supabase.from('user_profiles').select('*').eq('id', user.id).maybeSingle(),
      supabase.from('daily_completions').select('*').eq('user_id', user.id),
      supabase.from('weekly_data').select('*').eq('user_id', user.id),
    ])

    if (profileRes.data) {
      setProfile(profileRes.data)
      if (profileRes.data.start_date) {
        const sd = parseLocalDate(profileRes.data.start_date)
        setStartDate(sd)
        setCurDay(dayNumber(sd))
        setCurWeek(weekNumber(sd))
        if (!profileRes.data.name) setShowStandard(true)
      } else {
        setShowStandard(true)
      }
    } else {
      setShowStandard(true)
    }

    if (completionsRes.data) {
      const map: Record<string, Record<string, boolean>> = {}
      completionsRes.data.forEach(row => {
        if (!map[row.day_number]) map[row.day_number] = {}
        map[row.day_number][row.commitment_id] = true
      })
      setCompletions(map)
    }

    if (weeklyRes.data) {
      const map: Record<number, Record<string, boolean>> = {}
      weeklyRes.data.forEach(row => {
        map[row.week_number] = {
          sabbath: row.sabbath,
          scripture_memory: row.scripture_memory,
          act_of_service: row.act_of_service,
        }
      })
      setWeeklyData(map)
    }

    setLoading(false)
  }, [user.id])

  useEffect(() => { loadData() }, [loadData])

  // Saves the name, and sets the start date ONLY if there isn't one already.
  // Revisiting The Standard must never reset an existing participant to Day 1.
  async function beginJourney(name: string) {
    const alreadyStarted = !!profile.start_date
    const sdStr = alreadyStarted ? profile.start_date : localDateStr(today())

    await supabase.from('user_profiles').upsert({
      id: user.id,
      name: name || profile.name,
      start_date: sdStr,
      nutrition_approach: profile.nutrition_approach,
      nutrition_declaration: profile.nutrition_declaration,
    })

    setProfile(p => ({ ...p, name: name || p.name, start_date: sdStr }))

    if (!alreadyStarted && sdStr) {
      const sd = parseLocalDate(sdStr)
      setStartDate(sd)
      setCurDay(1)
      setCurWeek(1)
    }
    setShowStandard(false)
  }

  // Returning participants just close the screen. No database write at all.
  function closeStandard() {
    setShowStandard(false)
  }

  async function toggleCommitment(dayNum: number, commitmentId: string) {
    if (!startDate) return
    const todayNum = dayNumber(startDate)
    if (dayNum > todayNum) return

    const currentlyDone = completions[dayNum]?.[commitmentId] ?? false
    const newValue = !currentlyDone

    setCompletions(prev => ({
      ...prev,
      [dayNum]: { ...prev[dayNum], [commitmentId]: newValue }
    }))

    if (newValue) {
      await supabase.from('daily_completions').upsert({
        user_id: user.id,
        day_number: dayNum,
        commitment_id: commitmentId,
        completed_at: dayKey(startDate, dayNum),
      }, { onConflict: 'user_id,day_number,commitment_id' })
    } else {
      await supabase.from('daily_completions').delete()
        .eq('user_id', user.id)
        .eq('day_number', dayNum)
        .eq('commitment_id', commitmentId)
    }

    const updatedDay = { ...completions[dayNum], [commitmentId]: newValue }
    const allDone = COMMITMENTS.every(c => updatedDay[c.id])
    if (allDone && newValue) {
      setTimeout(() => {
        setCompletedDay(dayNum)
        setShowDayComplete(true)
      }, 600)
    }
  }

  async function toggleWeekly(weekNum: number, commitmentId: string) {
    const currentlyDone = weeklyData[weekNum]?.[commitmentId] ?? false
    const newValue = !currentlyDone

    setWeeklyData(prev => ({
      ...prev,
      [weekNum]: { ...prev[weekNum], [commitmentId]: newValue }
    }))

    const current = weeklyData[weekNum] || {}
    await supabase.from('weekly_data').upsert({
      user_id: user.id,
      week_number: weekNum,
      sabbath: commitmentId === 'sabbath' ? newValue : (current.sabbath ?? false),
      scripture_memory: commitmentId === 'scripture_memory' ? newValue : (current.scripture_memory ?? false),
      act_of_service: commitmentId === 'act_of_service' ? newValue : (current.act_of_service ?? false),
    }, { onConflict: 'user_id,week_number' })
  }

  async function saveNutrition(approach: string, declaration: string) {
    await supabase.from('user_profiles').upsert({
      id: user.id,
      name: profile.name,
      start_date: profile.start_date,
      nutrition_approach: approach,
      nutrition_declaration: declaration,
    })
    setProfile(p => ({ ...p, nutrition_approach: approach, nutrition_declaration: declaration }))
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0a0a' }}>
        <div style={{ width: 24, height: 24, border: '2px solid rgba(255,255,255,0.08)', borderTopColor: '#c41e1e', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  const todayNum = startDate ? dayNumber(startDate) : 1

  return (
    <div className="app">
      {showStandard && (
        <StandardScreen
          onBegin={beginJourney}
          onClose={closeStandard}
          onShowNourish={() => setShowNourish(true)}
          hasStarted={!!startDate}
          savedName={profile.name}
        />
      )}

      <div className="header" style={{ position: 'relative' }}>
        <img src="/logo.png" alt="40 Elevated" style={{ width: 160, height: 'auto', display: 'block', margin: '0 auto' }} />
        <button className="share-btn" onClick={() => setShowShare(true)} aria-label="Share">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
          </svg>
        </button>
      </div>

      <div className="tabs">
        {(['today', 'weekly', 'journey', 'promise'] as Tab[]).map(tab => (
          <button key={tab} className={`tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'today' && startDate && (
          <TodayTab
            curDay={curDay}
            todayNum={todayNum}
            startDate={startDate}
            completions={completions}
            nutritionApproach={profile.nutrition_approach}
            onToggle={toggleCommitment}
            onChangeDay={setCurDay}
            onShowInstall={() => setShowInstall(true)}
            onReturnToStandard={() => setShowStandard(true)}
            weeklyVerses={WEEKLY_VERSES}
            weekNum={weekNumber(startDate)}
          />
        )}
        {activeTab === 'weekly' && startDate && (
          <WeeklyTab
            curWeek={curWeek}
            startDate={startDate}
            weeklyData={weeklyData}
            onToggle={toggleWeekly}
            onChangeWeek={setCurWeek}
            onReturnToStandard={() => setShowStandard(true)}
          />
        )}
        {activeTab === 'journey' && startDate && (
          <JourneyTab
            startDate={startDate}
            completions={completions}
            todayNum={todayNum}
            onSelectDay={(day) => { setCurDay(day); setActiveTab('today') }}
            onReturnToStandard={() => setShowStandard(true)}
          />
        )}
        {activeTab === 'promise' && (
          <PromiseTab onReturnToStandard={() => setShowStandard(true)} />
        )}

        <button type="button" className="help-trigger" onClick={() => setShowHelp(true)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m2 7 10 6 10-6" />
          </svg>
          <span>Help?</span>
        </button>
      </div>

      {showShare && <ShareModal onClose={() => setShowShare(false)} />}
      {showInstall && <InstallScreen onClose={() => setShowInstall(false)} />}
      {showHelp && <HelpScreen onClose={() => setShowHelp(false)} />}
      {showNourish && (
        <NourishScreen
          approach={profile.nutrition_approach || ''}
          declaration={profile.nutrition_declaration || ''}
          onSave={saveNutrition}
          onClose={() => setShowNourish(false)}
        />
      )}
      {showDayComplete && (
        <DayCompleteScreen
          day={completedDay}
          onClose={() => setShowDayComplete(false)}
        />
      )}

      <style>{`
        .help-trigger { display: flex; align-items: center; justify-content: center; gap: 6px; margin: 26px auto 8px; padding: 11px 20px; background: none; border: 0.5px solid rgba(255,255,255,0.08); border-radius: 10px; color: #888; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; }
        .help-trigger:active { border-color: rgba(196,30,30,0.4); color: #e33; }
      `}</style>
    </div>
  )
}
