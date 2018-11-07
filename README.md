# TaskTrackerSpa

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix


## Design Choices
- Users
  - All users must be registered with a password greater than 7 characters
  - Now contains passwords which as hashed in the database
  - User token is stored as a cookie until logout
- Redux stores state of application which is a list of users, tasks, and assigned tasks, as well as the user's session info.
- React-Redux to connect the two
- All UI is done in React and not in pre-generated Elixir templates