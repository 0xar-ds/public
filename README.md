# introduction

a [moonrepo](https://moonrepo.dev) monorepo of bs I code for discord. currently it's only typescript projects, but will probably add some rust microservices in the future to offload some expensive computations i have on applications actually using this work.

# running

1. install proto ([what is proto?](https://moonrepo.dev/docs/proto))

```bash
bash <(curl -fsSL https://moonrepo.dev/install/proto.sh)
```

2. clone this repo

```bash
git clone <this>
```

3. cd into it
4. setup the environment through proto

```bash
proto install
```

5. run the project through the now installed `moon` binary monorepo!

```bash
moon run application:dev
```

# roadmap/future stuff i plan to do

- implement & expose both at libs/shared/discord.js/events & libs/shared/discord.js/logging whats discussed at [this markdown file](https://paste.rs/ta6CV)
- finish some modules (libs/server/discord/%) i was making both for event lookaheads & bridging events from one guild to another
- actually open source the applications that are built from this repo
