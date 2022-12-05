/*

*****     Interaction Object     *****

There is much about this object that I don't understand.

Dependancies: NONE - Simple output object

  https://discord.js.org/#/docs/discord.js/main/class/Guild

The Interaction Object is listed below. This is a slash command interaction that replies with
an embed.
This object is obtained by calling the following code:

discordClient.on("interactionCreate", async (interaction) => {
  console.log(interaction);
  // Response to slash command to show embed
  if (interaction.commandName === "testembed") {
    const embed = createEmbed();
    await interaction.reply({
      content: 'This is a test sentence...',
      embeds: [embed],
    });
  }
});

For more information please check out the following:
"../Embed/embed.js"

The JavaScript object that is listed below is altered to not show errors,
for the true console output, scroll past the JavaScript object to the footer comment.

*/

output =
{
  type: 2,
  id: '1049140952800972910',
  applicationId: '1044262032452628590',
  channelId: '1045035614266990675',
  guildId: '1045035613604294748',
  user: {
    id: '556859005016866853',
    bot: false,
    system: false,
    flags: { bitfield: 0, },
    username: 'BearTheCoder',
    discriminator: '6820',
    avatar: 'd1868bb3f4824dc3e174fcff067187cb',
    banner: undefined,
    accentColor: undefined,
  },
  member: {
    guild: {
      id: '1045035613604294748',
      name: 'BearsTestServer',
      icon: null,
      features: [Array],
      commands: [GuildApplicationCommandManager],
      members: [GuildMemberManager],
      channels: [GuildChannelManager],
      bans: [GuildBanManager],
      roles: [RoleManager],
      presences: {},
      voiceStates: [VoiceStateManager],
      stageInstances: [StageInstanceManager],
      invites: [GuildInviteManager],
      scheduledEvents: [GuildScheduledEventManager],
      available: true,
      shardId: 0,
      splash: null,
      banner: null,
      description: null,
      verificationLevel: 0,
      vanityURLCode: null,
      nsfwLevel: 0,
      premiumSubscriptionCount: 0,
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
      systemChannelFlags: [SystemChannelFlagsBitField],
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
      emojis: [GuildEmojiManager],
      stickers: [GuildStickerManager],
    },
    joinedTimestamp: 1669226306202,
    premiumSinceTimestamp: null,
    nickname: null,
    pending: false,
    communicationDisabledUntilTimestamp: null,
    _roles: [],
    user: {
      id: '556859005016866853',
      bot: false,
      system: false,
      flags: [UserFlagsBitField],
      username: 'BearTheCoder',
      discriminator: '6820',
      avatar: 'd1868bb3f4824dc3e174fcff067187cb',
      banner: undefined,
      accentColor: undefined,
    },
    avatar: null,
  },
  version: 1,
  appPermissions: {
    bitfield: 4398046511103n,
  },
  memberPermissions: { bitfield: 4398046511103n, },
  locale: 'en-US',
  guildLocale: 'en-US',
  commandId: '1049140898434400337',
  commandName: 'testembed',
  commandType: 1,
  commandGuildId: '1045035613604294748',
  deferred: false,
  replied: false,
  ephemeral: null,
  webhook: { id: '1044262032452628590', },
  options: {
    _group: null,
    _subcommand: null,
    _hoistedOptions: [],
  }
}

/*

ACTUAL INTERACTION OUTPUT

ChatInputCommandInteraction {
  type: 2,
  id: '1049140952800972910',
  applicationId: '1044262032452628590',
  channelId: '1045035614266990675',
  guildId: '1045035613604294748',
  user: User {
    id: '556859005016866853',
    bot: false,
    system: false,
    flags: UserFlagsBitField { bitfield: 0 },
    username: 'BearTheCoder',
    discriminator: '6820',
    avatar: 'd1868bb3f4824dc3e174fcff067187cb',
    banner: undefined,
    accentColor: undefined
  },
  member: GuildMember {
    guild: Guild {
      id: '1045035613604294748',
      name: 'BearsTestServer',
      icon: null,
      features: [Array],
      commands: [GuildApplicationCommandManager],
      members: [GuildMemberManager],
      channels: [GuildChannelManager],
      bans: [GuildBanManager],
      roles: [RoleManager],
      presences: PresenceManager {},
      voiceStates: [VoiceStateManager],
      stageInstances: [StageInstanceManager],
      invites: [GuildInviteManager],
      scheduledEvents: [GuildScheduledEventManager],
      available: true,
      shardId: 0,
      splash: null,
      banner: null,
      description: null,
      verificationLevel: 0,
      vanityURLCode: null,
      nsfwLevel: 0,
      premiumSubscriptionCount: 0,
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
      systemChannelFlags: [SystemChannelFlagsBitField],
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
      emojis: [GuildEmojiManager],
      stickers: [GuildStickerManager]
    },
    joinedTimestamp: 1669226306202,
    premiumSinceTimestamp: null,
    nickname: null,
    pending: false,
    communicationDisabledUntilTimestamp: null,
    _roles: [],
    user: User {
      id: '556859005016866853',
      bot: false,
      system: false,
      flags: [UserFlagsBitField],
      username: 'BearTheCoder',
      discriminator: '6820',
      avatar: 'd1868bb3f4824dc3e174fcff067187cb',
      banner: undefined,
      accentColor: undefined
    },
    avatar: null
  },
  version: 1,
  appPermissions: PermissionsBitField { bitfield: 4398046511103n 
},
  memberPermissions: PermissionsBitField { bitfield: 4398046511103n },
  locale: 'en-US',
  guildLocale: 'en-US',
  commandId: '1049140898434400337',
  commandName: 'testembed',
  commandType: 1,
  commandGuildId: '1045035613604294748',
  deferred: false,
  replied: false,
  ephemeral: null,
  webhook: InteractionWebhook { id: '1044262032452628590' },     
  options: CommandInteractionOptionResolver {
    _group: null,
    _subcommand: null,
    _hoistedOptions: []
  }
}

*/