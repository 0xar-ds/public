TODO: consider standarizing on the basis of how discord rest api endpoints work
TODO: consider all events within guilds to be /guilds/$GuildId/scope rather than /guilds/$GuildId/...$ExpandedScopesIds..., for example: /guilds/$GuildId/threads $ThreadId

# application

## client scope

| Event                |                                            Description                                            |                        Callpoint                        |
| :------------------- | :-----------------------------------------------------------------------------------------------: | :-----------------------------------------------------: |
| guildAvailable       |                            Emitted whenever a guild becomes available.                            |                 /client/guilds $GuildId                 |
| guildUnavailable     |           Emitted whenever a guild becomes unavailable, likely due to a server outage.            |                 /client/guilds $GuildId                 |
| guildMemberAvailable |                           Emitted whenever a member becomes available.                            |        /client/guilds/$GuildId/members $MemberId        |
| guildMembersChunk    |   Emitted whenever a chunk of guild members is received (all members come from the same guild).   |         /client/guilds/$GuildId/members $Nonce          |
| threadMemberUpdate   |                   Emitted whenever the client user's thread member is updated.                    | /client/guilds/$GuildId/$CategoryId/$ParentId/$ThreadId |
| threadListSync       |  Emitted whenever the client user gains access to a text or news channel that contains threads.   |             /client/guilds/$GuildId/threads             |
| soundboardSounds     | Emitted whenever soundboard sounds are received (all soundboard sounds come from the same guild). |             /client/guilds/$GuildId/sounds              |
| cacheSweep           |                                          not docummented                                          |                      /client/cache                      |
| invalidated          |                                          not docummented                                          |                      /client/state                      |

## gateway scope

| Event             |                                  Description                                   |                        Callpoint                         |
| :---------------- | :----------------------------------------------------------------------------: | :------------------------------------------------------: |
| ready             |            Emitted when the client becomes ready to start working.             |                     /gateway/client                      |
| error             |                  Emitted when the client encounters an error.                  |                     /gateway/client                      |
| warn              |                         Emitted for general warnings.                          |                     /gateway/client                      |
| debug             |                   Emitted for general debugging information.                   |                     /gateway/client                      |
| shardReady        |                       Emitted when a shard turns ready.                        |             /gateway/client/shards $ShardId              |
| shardError        |      Emitted whenever a shard's WebSocket encounters a connection error.       |             /gateway/client/shards $ShardId              |
| shardResume       |                   Emitted when a shard resumes successfully.                   |             /gateway/client/shards $ShardId              |
| shardDisconnect   |   Emitted when a shard's WebSocket disconnects and will no longer reconnect.   |             /gateway/client/shards $ShardId              |
| shardReconnecting |        Emitted when a shard is attempting to reconnect or re-identify.         |             /gateway/client/shards $ShardId              |
| userUpdate        |         Emitted whenever a user's details (e.g. username) are changed.         |                  /gateway/users $UserId                  |
| interactionCreate |                    Emitted when an interaction is created.                     | /gateway/interactions/$InteractionTypeKey $InteractionId |
| presenceUpdate    | Emitted whenever a guild member's presence (e.g. status, activity) is changed. |                /gateway/presences $UserId                |

## installations scope

| Event              |                                        Description                                         |                          Callpoint                           |
| :----------------- | :----------------------------------------------------------------------------------------: | :----------------------------------------------------------: |
| guildCreate        |                         Emitted whenever the client joins a guild.                         |                 /application/guilds $GuildId                 |
| guildDelete        |          Emitted whenever a guild kicks the client or the guild is deleted/left.           |                 /application/guilds $GuildId                 |
| entitlementCreate  |                        Emitted whenever an entitlement is created.                         | /application/monetization/$SkuId/entitlements $EntitlementId |
| entitlementUpdate  |    Emitted whenever an entitlement is updated - i.e. when a user's subscription renews.    | /application/monetization/$SkuId/entitlements $EntitlementId |
| entitlementDelete  | Emitted whenever an entitlement is deleted. Entitlements are not deleted when they expire. | /application/monetization/$SkuId/entitlements $EntitlementId |
| subscriptionCreate |                        Emitted whenever a subscription is created.                         |   /application/monetization/subscriptions $SubscriptionId    |
| subscriptionUpdate |    Emitted whenever a subscription is updated - i.e. when a user's subscription renews.    |   /application/monetization/subscriptions $SubscriptionId    |
| subscriptionDelete |                        Emitted whenever a subscription is deleted.                         |   /application/monetization/subscriptions $SubscriptionId    |

# channel

## actions scope

| Event             |                     Description                     |                         Callpoint                          |
| :---------------- | :-------------------------------------------------: | :--------------------------------------------------------: |
| typingStart       | Emitted whenever a user starts typing in a channel. |          /guilds/$GuildId/$CategoryId/$ChannelId           |
| typingStart       |                                                     |     /guilds/$GuildId/$CategoryId/$ChannelId/$ThreadId      |
| typingStart       |                                                     |               /users/$RecipientId/$ChannelId               |
| typingStart       |                                                     |                     /groups/$ChannelId                     |
| messageDeleteBulk |   Emitted whenever messages are deleted in bulk.    |      /guilds/$GuildId/$CategoryId/$ChannelId/messages      |
| messageDeleteBulk |                                                     | /guilds/$GuildId/$CategoryId/$ChannelId/$ThreadId/messages |
| channelPinsUpdate | Emitted whenever the pins of a channel are updated. |        /guilds/$GuildId/$CategoryId/$ChannelId/pins        |
| channelPinsUpdate |                                                     |   /guilds/$GuildId/$CategoryId/$ChannelId/$ThreadId/pins   |
| channelPinsUpdate |                                                     |            /users/$RecipientId/$ChannelId/pins             |
| channelPinsUpdate |                                                     |                  /groups/$ChannelId/pins                   |

## lifecycle scope

| Event         |                                         Description                                          |                Callpoint                |
| :------------ | :------------------------------------------------------------------------------------------: | :-------------------------------------: |
| channelCreate |                         Emitted whenever a guild channel is created.                         |       /guilds/$GuildId $ChannelId       |
| channelCreate |                                                                                              | /guilds/$GuildId/$CategoryId $ChannelId |
| channelUpdate | Emitted whenever a channel is updated - e.g. name change, topic change, channel type change. |       /guilds/$GuildId $ChannelId       |
| channelUpdate |                                                                                              | /guilds/$GuildId/$CategoryId $ChannelId |
| channelUpdate |                                                                                              |     /users/$RecipientId $ChannelId      |
| channelDelete |                            Emitted whenever a channel is deleted.                            |       /guilds/$GuildId $ChannelId       |
| channelDelete |                                                                                              | /guilds/$GuildId/$CategoryId $ChannelId |
| channelDelete |                                                                                              |     /users/$RecipientId $ChannelId      |

## stage scope

| Event               |                                       Description                                       |                         Callpoint                          |
| :------------------ | :-------------------------------------------------------------------------------------: | :--------------------------------------------------------: |
| stageInstanceCreate |                      Emitted whenever a stage instance is created.                      | /guilds/$GuildId/$CategoryId/$ChannelId/events $InstanceId |
| stageInstanceUpdate | Emitted whenever a stage instance gets updated - e.g. change in topic or privacy level. | /guilds/$GuildId/$CategoryId/$ChannelId/events $InstanceId |
| stageInstanceDelete |                      Emitted whenever a stage instance is deleted.                      | /guilds/$GuildId/$CategoryId/$ChannelId/events $InstanceId |

## voice scope

| Event                  |                                                   Description                                                   |                   Callpoint                   |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------: |
| voiceStateUpdate       |           Emitted whenever a member changes voice state - e.g. joins/leaves a channel, mutes/unmutes.           | /guilds/$GuildId/$CategoryId/$ChannelId/voice |
| voiceChannelEffectSend | Emitted when someone sends an effect, such as an emoji reaction, in a voice channel the client is connected to. | /guilds/$GuildId/$CategoryId/$ChannelId/voice |

## webhook scope

| Event          |                     Description                      |                         Callpoint                          |
| :------------- | :--------------------------------------------------: | :--------------------------------------------------------: |
| webhookUpdate  | Emitted whenever a channel has its webhooks changed. | /guilds/$GuildId/$CategoryId/$ChannelId/$ThreadId/webhooks |
| webhookUpdate  |                                                      |      /guilds/$GuildId/$CategoryId/$ChannelId/webhooks      |
| webhooksUpdate | Emitted whenever a channel has its webhooks changed. | /guilds/$GuildId/$CategoryId/$ChannelId/$ThreadId/webhooks |
| webhooksUpdate |                                                      |      /guilds/$GuildId/$CategoryId/$ChannelId/webhooks      |

# guild

## configuration scope

| Event                               |                                   Description                                    |                              Callpoint                              |
| :---------------------------------- | :------------------------------------------------------------------------------: | :-----------------------------------------------------------------: |
| guildIntegrationsUpdate             |                 Emitted whenever a guild integration is updated.                 |                    /guilds/$GuildId/integrations                    |
| applicationCommandPermissionsUpdate | Emitted whenever permissions for an application command in a guild were updated. | /guilds/$GuildId/integrations/$ApplicationId/permissions $CommandId |
| guildUpdate                         |             Emitted whenever a guild is updated - e.g. name change.              |                          /guilds/$GuildId                           |
| autoModerationRuleCreate            |               Emitted whenever an auto moderation rule is created.               |               /guilds/$GuildId/automod/rules $RuleId                |
| autoModerationRuleUpdate            |              Emitted whenever an auto moderation rule gets updated.              |               /guilds/$GuildId/automod/rules $RuleId                |
| autoModerationRuleDelete            |               Emitted whenever an auto moderation rule is deleted.               |               /guilds/$GuildId/automod/rules $RuleId                |
| autoModerationActionExecution       |              Emitted whenever an auto moderation rule is triggered.              |               /guilds/$GuildId/automod/rules $RuleId                |

## members scope

| Event             |                                   Description                                    |             Callpoint              |
| :---------------- | :------------------------------------------------------------------------------: | :--------------------------------: |
| guildMemberAdd    |                      Emitted whenever a user joins a guild.                      | /guilds/$GuildId/members $MemberId |
| guildMemberUpdate | Emitted whenever a guild member changes - i.e. new role, removed role, nickname. | /guilds/$GuildId/members $MemberId |
| guildMemberRemove |             Emitted whenever a member leaves a guild, or is kicked.              | /guilds/$GuildId/members $MemberId |
| guildBanAdd       |                Emitted whenever a member is banned from a guild.                 |  /guilds/$GuildId/bans $MemberId   |
| guildBanRemove    |               Emitted whenever a member is unbanned from a guild.                |  /guilds/$GuildId/bans $MemberId   |

## events scope

| Event                         |                            Description                             |                     Callpoint                      |
| :---------------------------- | :----------------------------------------------------------------: | :------------------------------------------------: |
| guildScheduledEventCreate     |        Emitted whenever a guild scheduled event is created.        |          /guilds/$GuildId/events $EventId          |
| guildScheduledEventUpdate     |       Emitted whenever a guild scheduled event gets updated.       |          /guilds/$GuildId/events $EventId          |
| guildScheduledEventDelete     |        Emitted whenever a guild scheduled event is deleted.        |          /guilds/$GuildId/events $EventId          |
| guildScheduledEventUserAdd    |   Emitted whenever a user subscribes to a guild scheduled event.   | /guilds/$GuildId/events/$EventId/attendees $UserId |
| guildScheduledEventUserRemove | Emitted whenever a user unsubscribes from a guild scheduled event. | /guilds/$GuildId/events/$EventId/attendees $UserId |

## expressions scope

| Event                     |                       Description                        |             Callpoint              |
| :------------------------ | :------------------------------------------------------: | :--------------------------------: |
| guildSounboardSoundCreate |                      not documented                      |  /guilds/$GuildId/sounds $SoundId  |
| guildSounboardSoundUpdate |                      not documented                      |  /guilds/$GuildId/sounds $SoundId  |
| guildSounboardSoundDelete |                      not documented                      |  /guilds/$GuildId/sounds $SoundId  |
| emojiCreate               |  Emitted whenever a custom emoji is created in a guild.  |  /guilds/$GuildId/sounds $EmojiId  |
| emojiUpdate               |  Emitted whenever a custom emoji is updated in a guild.  |  /guilds/$GuildId/sounds $EmojiId  |
| emojiDelete               |  Emitted whenever a custom emoji is deleted in a guild.  |  /guilds/$GuildId/sounds $EmojiId  |
| stickerCreate             | Emitted whenever a custom sticker is created in a guild. | /guilds/$GuildId/sounds $StickerId |
| stickerUpdate             | Emitted whenever a custom sticker is updated in a guild. | /guilds/$GuildId/sounds $StickerId |
| stickerDelete             | Emitted whenever a custom sticker is deleted in a guild. | /guilds/$GuildId/sounds $StickerId |

## invites scope

| Event        |            Description             |               Callpoint                |
| :----------- | :--------------------------------: | :------------------------------------: |
| inviteCreate | Emitted when an invite is created. |  /guilds/$GuildId/invites $InviteCode  |
| inviteCreate |                                    | /groups/$ChannelId/invites $InviteCode |
| inviteDelete | Emitted when an invite is deleted. |  /guilds/$GuildId/invites $InviteCode  |
| inviteDelete |                                    | /groups/$ChannelId/invites $InviteCode |

## logs scope

| Event                    |                     Description                      |            Callpoint            |
| :----------------------- | :--------------------------------------------------: | :-----------------------------: |
| guildAuditLogEntryCreate | Emitted whenever a guild audit log entry is created. | /guilds/$GuildId/audit $EntryId |

## roles scope

| Event      |                Description                |           Callpoint            |
| :--------- | :---------------------------------------: | :----------------------------: |
| roleCreate |    Emitted whenever a role is created.    | /guilds/$GuildId/roles $RoleId |
| roleUpdate | Emitted whenever a guild role is updated. | /guilds/$GuildId/roles $RoleId |
| roleDelete | Emitted whenever a guild role is deleted. | /guilds/$GuildId/roles $RoleId |

# message

## lifecycle scope

| Event         |                              Description                              |                          Callpoint                           |
| :------------ | :-------------------------------------------------------------------: | :----------------------------------------------------------: |
| messageCreate |                Emitted whenever a message is created.                 |      /guilds/$GuildId/$CategoryId/$ChannelId $MessageId      |
| messageCreate |                                                                       | /guilds/$GuildId/$CategoryId/$ChannelId/$ThreadId $MessageId |
| messageCreate |                                                                       |          /users/$RecipientId/$ChannelId $MessageId           |
| messageUpdate | Emitted whenever a message is updated - e.g. embed or content change. |      /guilds/$GuildId/$CategoryId/$ChannelId $MessageId      |
| messageUpdate |                                                                       | /guilds/$GuildId/$CategoryId/$ChannelId/$ThreadId $MessageId |
| messageUpdate |                                                                       |          /users/$RecipientId/$ChannelId $MessageId           |
| messageDelete |                Emitted whenever a message is deleted.                 |      /guilds/$GuildId/$CategoryId/$ChannelId $MessageId      |
| messageDelete |                                                                       | /guilds/$GuildId/$CategoryId/$ChannelId/$ThreadId $MessageId |
| messageDelete |                                                                       |          /users/$RecipientId/$ChannelId $MessageId           |

## polls scope

| Event                 |                      Description                      |                                  Callpoint                                   |
| :-------------------- | :---------------------------------------------------: | :--------------------------------------------------------------------------: |
| messagePollVoteAdd    |       Emitted whenever a user votes in a poll.        |      /guilds/$GuildId/$CategoryId/$ChannelId/$MessageId/polls $AnswerId      |
| messagePollVoteAdd    |                                                       | /guilds/$GuildId/$CategoryId/$ChannelId/$ThreadId/$MessageId/polls $AnswerId |
| messagePollVoteAdd    |                                                       |          /users/$RecipientId/$ChannelId/$MessageId/polls $AnswerId           |
| messagePollVoteAdd    |                                                       |                /groups/$ChannelId/$MessageId/polls $AnswerId                 |
| messagePollVoteRemove | Emitted whenever a user removes their vote in a poll. |      /guilds/$GuildId/$CategoryId/$ChannelId/$MessageId/polls $AnswerId      |
| messagePollVoteRemove |                                                       | /guilds/$GuildId/$CategoryId/$ChannelId/$ThreadId/$MessageId/polls $AnswerId |
| messagePollVoteRemove |                                                       |          /users/$RecipientId/$ChannelId/$MessageId/polls $AnswerId           |
| messagePollVoteRemove |                                                       |                /groups/$ChannelId/$MessageId/polls $AnswerId                 |

## reactions scope

| Event                      |                             Description                             |                                   Callpoint                                   |
| :------------------------- | :-----------------------------------------------------------------: | :---------------------------------------------------------------------------: |
| messageReactionAdd         |      Emitted whenever a reaction is added to a cached message.      |      /guilds/$GuildId/$CategoryId/$ChannelId/$MessageId/reactions $Emoji      |
| messageReactionAdd         |                                                                     | /guilds/$GuildId/$CategoryId/$ChannelId/$ThreadId/$MessageId/reactions $Emoji |
| messageReactionAdd         |                                                                     |          /users/$RecipientId/$ChannelId/$MessageId/reactions $Emoji           |
| messageReactionAdd         |                                                                     |                /groups/$ChannelId/$MessageId/reactions $Emoji                 |
| messageReactionRemove      |    Emitted whenever a reaction is removed from a cached message.    |      /guilds/$GuildId/$CategoryId/$ChannelId/$MessageId/reactions $Emoji      |
| messageReactionRemove      |                                                                     | /guilds/$GuildId/$CategoryId/$ChannelId/$ThreadId/$MessageId/reactions $Emoji |
| messageReactionRemove      |                                                                     |          /users/$RecipientId/$ChannelId/$MessageId/reactions $Emoji           |
| messageReactionRemove      |                                                                     |                /groups/$ChannelId/$MessageId/reactions $Emoji                 |
| messageReactionRemoveAll   |  Emitted whenever all reactions are removed from a cached message.  |         /guilds/$GuildId/$CategoryId/$ChannelId/$MessageId/reactions          |
| messageReactionRemoveAll   |                                                                     |    /guilds/$GuildId/$CategoryId/$ChannelId/$ThreadId/$MessageId/reactions     |
| messageReactionRemoveAll   |                                                                     |              /users/$RecipientId/$ChannelId/$MessageId/reactions              |
| messageReactionRemoveAll   |                                                                     |                    /groups/$ChannelId/$MessageId/reactions                    |
| messageReactionRemoveEmoji | Emitted when a bot removes an emoji reaction from a cached message. |      /guilds/$GuildId/$CategoryId/$ChannelId/$MessageId/reactions $Emoji      |
| messageReactionRemoveEmoji |                                                                     | /guilds/$GuildId/$CategoryId/$ChannelId/$ThreadId/$MessageId/reactions $Emoji |
| messageReactionRemoveEmoji |                                                                     |          /users/$RecipientId/$ChannelId/$MessageId/reactions $Emoji           |
| messageReactionRemoveEmoji |                                                                     |                /groups/$ChannelId/$MessageId/reactions $Emoji                 |

# thread

## lifecycle scope

| Event        |                                             Description                                             |                     Callpoint                     |
| :----------- | :-------------------------------------------------------------------------------------------------: | :-----------------------------------------------: |
| threadCreate |         Emitted whenever a thread is created or when the client user is added to a thread.          |            /guilds/$GuildId $ThreadId             |
| threadCreate |                                                                                                     | /guilds/$GuildId/$CategoryId/$ChannelId $ThreadId |
| threadUpdate | Emitted whenever a thread is updated - e.g. name change, archive state change, locked state change. |            /guilds/$GuildId $ThreadId             |
| threadUpdate |                                                                                                     | /guilds/$GuildId/$CategoryId/$ChannelId $ThreadId |
| threadDelete |                                Emitted whenever a thread is deleted.                                |            /guilds/$GuildId $ThreadId             |
| threadDelete |                                                                                                     | /guilds/$GuildId/$CategoryId/$ChannelId $ThreadId |

## members scope

| Event               |                         Description                          |                         Callpoint                         |
| :------------------ | :----------------------------------------------------------: | :-------------------------------------------------------: |
| threadMembersUpdate | Emitted whenever members are added or removed from a thread. |            /guilds/$GuildId/$ThreadId/members             |
| threadMembersUpdate |                                                              | /guilds/$GuildId/$CategoryId/$ChannelId/$ThreadId/members |
