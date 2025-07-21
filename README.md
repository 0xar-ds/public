# introduction

a shim/breakdown of apps/example-application in the main branch :)

# running

1. clone this repo

```bash
git clone <this>
```

2. cd into it
3. setup the environment

```bash
pnpm install
```

4. config the example application

```bash
echo -e "[context]
name = \"example-application\"
environment = \"development\"
log_enable = true
log_level = \"ALL\"

[application]
token = \"!! YOUR TOKEN HERE !!\"
guild = \"!! YOUR GUILD ID HERE !!\"

[ui]
default_profile_picture_representation = \"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg\"" > ./apps/example-application/.env.development.toml
```

5. run the project

```bash
pnpm run dev
```
