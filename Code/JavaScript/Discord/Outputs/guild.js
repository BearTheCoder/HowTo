/*

*****     Guild Object     *****

There is much about this object that I don't understand.

Dependancies: NONE - Simple output object

  https://discord.js.org/#/docs/discord.js/main/class/Guild

The Guild Object is listed below.
This object is obtained by calling the following code:

discordClient.on(Events.GuildCreate, (guild) => {
  console.log(guild);
});

For more information please check out the following:
"../Events/guildCreate.js"

The JavaScript object that is listed below is altered to not show errors,
for the true console output, scroll past the JavaScript object to the footer comment.
*/

output =
{
  id: '1045035613604294748',
  name: 'BearsTestServer',
  icon: null,
  features: ['APPLICATION_COMMAND_PERMISSIONS_V2'],
  commands: {
    permissions: {
      manager: [Circular * 1],
      guild: [Circular * 2],
      guildId: '1045035613604294748',
      commandId: null,
    },
    guild: [Circular * 2],
  },
  members: { guild: [Circular * 2], },
  channels: { guild: [Circular * 2], },
  bans: { guild: [Circular * 2], },
  roles: { guild: [Circular * 2], },
  presences: {},
  voiceStates: { guild: [Circular * 2], },
  stageInstances: { guild: [Circular * 2], },
  invites: { guild: [Circular * 2], },
  scheduledEvents: { guild: [Circular * 2], },
  splash: null,
  banner: null,
  description: null,
  verificationLevel: 0,
  vanityURLCode: null,
  nsfwLevel: 0,
  premiumSubscriptionCount: 0,
  available: true,
  discoverySplash: null,
  memberCount: 2,
  large: false,
  premiumProgressBarEnabled: false,
  applicationId: null,
  afkTimeout: 300,
  afkChannelId: null,
  systemChannelId: '1045035614266990675',
  premiumTier: 0,
  widgetEnabled: null,
  widgetChannelId: null,
  explicitContentFilter: 0,
  mfaLevel: 0,
  joinedTimestamp: 1670204044728,
  defaultMessageNotifications: 0,
  systemChannelFlags: { bitfield: 0, },
  maximumMembers: 500000,
  maximumPresences: null,
  maxVideoChannelUsers: 25,
  approximateMemberCount: null,
  approximatePresenceCount: null,
  vanityURLUses: null,
  rulesChannelId: null,
  publicUpdatesChannelId: null,
  preferredLocale: 'en-US',
  ownerId: '556859005016866853',
  emojis: { guild: [Circular * 2], },
  stickers: { guild: [Circular * 2], },
  shardId: 0,
};

/*

ACTUAL OUTPUT FROM CONSOLE

<ref *2> Guild {
  id: '1045035613604294748',
  name: 'BearsTestServer',
  icon: null,
  features: [ 'APPLICATION_COMMAND_PERMISSIONS_V2' ],
  commands: <ref *1> GuildApplicationCommandManager {
    permissions: ApplicationCommandPermissionsManager {
      manager: [Circular *1],
      guild: [Circular *2],
      guildId: '1045035613604294748',
      commandId: null
    },
    guild: [Circular *2]
  },
  members: GuildMemberManager { guild: [Circular *2] },
  channels: GuildChannelManager { guild: [Circular *2] },        
  bans: GuildBanManager { guild: [Circular *2] },
  roles: RoleManager { guild: [Circular *2] },
  presences: PresenceManager {},
  voiceStates: VoiceStateManager { guild: [Circular *2] },       
  stageInstances: StageInstanceManager { guild: [Circular *2] }, 
  invites: GuildInviteManager { guild: [Circular *2] },
  scheduledEvents: GuildScheduledEventManager { guild: [Circular *2] },
  splash: null,
  banner: null,
  description: null,
  verificationLevel: 0,
  vanityURLCode: null,
  nsfwLevel: 0,
  premiumSubscriptionCount: 0,
  available: true,
  discoverySplash: null,
  memberCount: 2,
  large: false,
  premiumProgressBarEnabled: false,
  applicationId: null,
  afkTimeout: 300,
  afkChannelId: null,
  systemChannelId: '1045035614266990675',
  premiumTier: 0,
  widgetEnabled: null,
  widgetChannelId: null,
  explicitContentFilter: 0,
  mfaLevel: 0,
  joinedTimestamp: 1670204044728,
  defaultMessageNotifications: 0,
  systemChannelFlags: SystemChannelFlagsBitField { bitfield: 0 },  maximumMembers: 500000,
  maximumPresences: null,
  maxVideoChannelUsers: 25,
  approximateMemberCount: null,
  approximatePresenceCount: null,
  vanityURLUses: null,
  rulesChannelId: null,
  publicUpdatesChannelId: null,
  preferredLocale: 'en-US',
  ownerId: '556859005016866853',
  emojis: GuildEmojiManager { guild: [Circular *2] },
  stickers: GuildStickerManager { guild: [Circular *2] },        
  shardId: 0
}

*/