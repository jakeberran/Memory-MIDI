#NoEnv
#SingleInstance, Force
SendMode, Input
SetBatchLines, -1
SetWorkingDir, %A_ScriptDir%

PgUp:: Send, q
PgDn:: Send, p

^+End::ExitApp