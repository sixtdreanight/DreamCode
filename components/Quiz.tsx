'use client'

import { useState } from 'react'
import { getQuizById } from '@/lib/quiz-data'
import { saveQuizResult, getLessonProgress } from '@/lib/progress'
import { CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react'

export default function Quiz({ quizId }: { quizId: string }) {
  const quiz = getQuizById(quizId)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [showResult, setShowResult] = useState(false)

  if (!quiz) {
    return (
      <div className="p-4 border rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-sm flex items-center gap-2">
        <AlertCircle className="w-4 h-4 shrink-0" />
        测验数据未加载，请稍后重试。
      </div>
    )
  }

  const total = quiz.questions.length
  const question = quiz.questions[current]
  const selectedAnswer = answers[current]
  const isRevealed = revealed.has(current)
  const isCorrect = selectedAnswer === question.correctIndex

  function handleSelect(idx: number) {
    if (isRevealed) return
    const next = [...answers]
    next[current] = idx
    setAnswers(next)
  }

  function handleConfirm() {
    if (selectedAnswer === undefined) return
    setRevealed(new Set([...revealed, current]))
  }

  function handleNext() {
    if (current < total - 1) {
      setCurrent(current + 1)
    } else {
      setShowResult(true)
      const score = Math.round(
        (answers.filter((a, i) => a === quiz!.questions[i].correctIndex).length / total) * 100
      )
      saveQuizResult(quiz!.lessonId, score)
    }
  }

  function handleRetry() {
    setCurrent(0)
    setAnswers([])
    setRevealed(new Set())
    setShowResult(false)
  }

  if (showResult) {
    const correct = answers.filter((a, i) => a === quiz.questions[i].correctIndex).length
    const score = Math.round((correct / total) * 100)
    const passed = score >= quiz.passingScore

    return (
      <div className="border rounded-xl p-6 text-center space-y-4 animate-scale-in">
        <div className={`text-5xl ${passed ? '' : ''}`}>{passed ? '🎉' : '📚'}</div>
        <h3 className="text-xl font-bold">
          {passed ? '恭喜通过！' : '继续加油！'}
        </h3>
        <div className="text-3xl font-bold text-accent">{score} 分</div>
        <p className="text-sm text-zinc-500">
          答对 {correct}/{total} 题 · 通过线 {quiz.passingScore} 分
        </p>
        {!passed && (
          <p className="text-sm text-zinc-500">
            不要气馁，复习一下课程内容再试一次吧！
          </p>
        )}
        <button
          onClick={handleRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
        >
          <RefreshCw className="w-4 h-4" /> 重新测验
        </button>
      </div>
    )
  }

  return (
    <div className="border rounded-xl p-5 space-y-4 animate-slide-up">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-accent">{quiz.title}</span>
        <span className="text-zinc-500">{current + 1} / {total}</span>
      </div>

      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i === current ? 'bg-accent' : revealed.has(i) ? 'bg-accent/30' : 'bg-zinc-200 dark:bg-zinc-700'
            }`}
          />
        ))}
      </div>

      <p className="font-medium">{question.question}</p>

      <div className="space-y-2">
        {question.options.map((opt, idx) => {
          let btnClass = 'border border-primary bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800'
          if (isRevealed) {
            if (idx === question.correctIndex) {
              btnClass = 'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300'
            } else if (idx === selectedAnswer) {
              btnClass = 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
            } else {
              btnClass = 'border-primary opacity-50'
            }
          } else if (idx === selectedAnswer) {
            btnClass = 'border-accent bg-accent/5 ring-1 ring-accent'
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isRevealed}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 ${btnClass}`}
            >
              <span className="w-6 h-6 rounded-full border border-primary flex items-center justify-center text-xs shrink-0 font-mono">
                {String.fromCharCode(65 + idx)}
              </span>
              {opt}
              {isRevealed && idx === question.correctIndex && (
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 ml-auto" />
              )}
              {isRevealed && idx === selectedAnswer && idx !== question.correctIndex && (
                <XCircle className="w-4 h-4 text-red-500 shrink-0 ml-auto" />
              )}
            </button>
          )
        })}
      </div>

      {isRevealed && (
        <div className={`p-3 rounded-lg text-sm ${isCorrect ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'}`}>
          {isCorrect ? '✓ 回答正确！' : '✗ 回答错误！'} {question.explanation}
        </div>
      )}

      <div className="flex justify-end">
        {!isRevealed ? (
          <button
            onClick={handleConfirm}
            disabled={selectedAnswer === undefined}
            className="px-4 py-2 bg-accent text-white rounded-lg text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            确认
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-accent text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            {current < total - 1 ? '下一题' : '查看结果'}
          </button>
        )}
      </div>
    </div>
  )
}
