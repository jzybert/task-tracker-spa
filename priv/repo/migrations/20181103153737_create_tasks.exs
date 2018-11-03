defmodule TaskTrackerSpa.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string, null: false
      add :desc, :text, null: false
      add :time_worked, :time, null: false
      add :is_complete, :boolean, default: false, null: false

      timestamps()
    end

    create index(:tasks, [:title], unique: true)
  end
end
