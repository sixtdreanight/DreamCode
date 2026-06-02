"use client";

import { useState } from "react";
import { getQuizById } from "@/lib/quiz-data";
import { saveQuizResult } from "@/lib/progress";
import { CheckCircle2, XCircle, AlertCircle, RefreshCw, Trophy, BookOpen } from "lucide-react";

export default function Quiz({ quizId }: { quizId: string }) {
  const quiz = getQuizById(quizId);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [showResult, setShowResult] = useState(false);

  if (!quiz) {
    return (
      <div className="p-4 rounded-xl bg-warning-soft border border-warning/20 text-warning text-sm flex items-center gap-2">
        <AlertCircle className="w-4 h-4 shrink-0" />
        测验数据未加载，请稍后重试。
      </div>
    );
  }

  const total = quiz.questions.length;
  const question = quiz.questions[current];
  const selectedAnswer = answers[current];
  const isRevealed = revealed.has(current);
  const isCorrect = selectedAnswer === question.correctIndex;

  function handleSelect(idx: number) {
    if (isRevealed) return;
    const next = [...answers];
    next[current] = idx;
    setAnswers(next);
  }

  function handleConfirm() {
    if (selectedAnswer === undefined) return;
    setRevealed(new Set([...revealed, current]));
  }

  function handleNext() {
    if (current < total - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
      const score = Math.round(
        (answers.filter((a, i) => a === quiz!.questions[i].correctIndex).length / total) * 100
      );
      saveQuizResult(quiz!.lessonId, score);
    }
  }

  function handleRetry() {
    setCurrent(0);
    setAnswers([]);
    setRevealed(new Set());
    setShowResult(false);
  }

  if (showResult) {
    const correct = answers.filter((a, i) => a === quiz.questions[i].correctIndex).length;
    const score = Math.round((correct / total) * 100);
    const passed = score >= quiz.passingScore;

    return (
      <div className="card p-8 text-center space-y-5 animate-scale-in">
        <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center ${passed ? "bg-success-soft" : "bg-warning-soft"}`}>
          {passed ? (
            <Trophy className="w-9 h-9 text-success" />
          ) : (
            <BookOpen className="w-9 h-9 text-warning" />
          )}
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold">
            {passed ? "恭喜通过！" : "继续加油！"}
          </h3>
          <p className="text-4xl font-black text-accent mt-2">{score} 分</p>
        </div>
        <p className="text-sm text-muted">
          答对 {correct}/{total} 题 · 通过线 {quiz.passingScore} 分
        </p>
        {!passed && (
          <p className="text-sm text-muted">
            不要气馁，复习一下课程内容再试一次吧！
          </p>
        )}
        <button
          onClick={handleRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl text-sm font-semibold hover:shadow-lg active:scale-95 transition-all"
        >
          <RefreshCw className="w-4 h-4" /> 重新测验
        </button>
      </div>
    );
  }

  return (
    <div className="card p-6 space-y-5 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-accent">{quiz.title}</span>
        <span className="text-sm text-muted tabular-nums">{current + 1} / {total}</span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-accent shadow-glow"
                : revealed.has(i)
                ? "bg-accent/40"
                : "bg-surface-raised"
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <p className="font-semibold text-lg leading-relaxed">{question.question}</p>

      {/* Options */}
      <div className="space-y-2.5">
        {question.options.map((opt, idx) => {
          let btnClass = "border border-edge bg-surface hover:bg-surface-alt hover:border-edge-strong";
          if (isRevealed) {
            if (idx === question.correctIndex) {
              btnClass = "border-success/40 bg-success-soft text-success";
            } else if (idx === selectedAnswer) {
              btnClass = "border-accent/40 bg-accent-soft text-accent";
            } else {
              btnClass = "border-edge opacity-40";
            }
          } else if (idx === selectedAnswer) {
            btnClass = "border-accent bg-accent-soft ring-2 ring-accent/20";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isRevealed}
              className={`w-full text-left px-5 py-3.5 rounded-xl text-sm transition-all flex items-center gap-3.5 ${btnClass}`}
            >
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 font-mono transition-colors ${
                isRevealed && idx === question.correctIndex
                  ? "bg-success text-white"
                  : isRevealed && idx === selectedAnswer && idx !== question.correctIndex
                  ? "bg-accent text-white"
                  : idx === selectedAnswer && !isRevealed
                  ? "bg-accent text-white"
                  : "bg-surface-raised text-muted"
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{opt}</span>
              {isRevealed && idx === question.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
              )}
              {isRevealed && idx === selectedAnswer && idx !== question.correctIndex && (
                <XCircle className="w-5 h-5 text-accent shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {isRevealed && (
        <div className={`p-4 rounded-xl text-sm leading-relaxed ${
          isCorrect
            ? "bg-success-soft text-success border border-success/20"
            : "bg-accent-soft text-accent border border-accent/20"
        }`}>
          <span className="font-bold">{isCorrect ? "✓ 回答正确！" : "✗ 回答错误！"}</span>{" "}
          {question.explanation}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end pt-1">
        {!isRevealed ? (
          <button
            onClick={handleConfirm}
            disabled={selectedAnswer === undefined}
            className="px-6 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:shadow-lg active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 transition-all"
          >
            确认答案
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
          >
            {current < total - 1 ? "下一题" : "查看结果"}
          </button>
        )}
      </div>
    </div>
  );
}
