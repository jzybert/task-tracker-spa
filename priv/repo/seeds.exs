# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTrackerSpa.Repo.insert!(%TaskTrackerSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias TaskTrackerSpa.Repo
alias TaskTrackerSpa.Users.User
pwhash = Argon2.hash_pwd_salt("pass1")

Repo.insert!(%User{email: "alice@example.com", admin: true, password_hash: pwhash})
Repo.insert!(%User{email: "bob@example.com", admin: false, password_hash: pwhash})

alias TaskTrackerSpa.Tasks.Task
Repo.insert!(%Task{title: "Task 1", desc: "This is a task.", time_worked: ~T[00:00:00.00], is_complete: false})
Repo.insert!(%Task{title: "Task 2", desc: "This is a task.", time_worked: ~T[04:00:00.00], is_complete: true})
Repo.insert!(%Task{title: "Task 3", desc: "This is a task.", time_worked: ~T[00:01:00.00], is_complete: false})
Repo.insert!(%Task{title: "Task 4", desc: "This is a task.", time_worked: ~T[03:15:00.00], is_complete: true})