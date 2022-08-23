import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Client,
  ComponentType,
  EmbedBuilder,
  GatewayDispatchEvents,
  IntentsBitField,
  Message,
  MessagePayload,
  TextChannel,
} from "discord.js";
import { config } from "dotenv";
import { writeFileSync } from "fs";

config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
});

client.on("ready", async () => {
  console.log("I am ready");
  // const guild = await client.guilds.fetch("621759717756370964");
  const guild = await client.guilds.fetch("792908935774076938");

  // const role = await guild.roles.fetch("872124401129246822");

  // const clanRoles = [
  //   "979393824881246209",
  //   "979393911971778580",
  //   "979394021636050985",
  //   "979394052501950485",
  //   "979394149780447262",
  //   "979394185134239794",
  // ];

  // await guild.members.fetch();

  // const members = role?.members;
  // console.log(members?.size);
  // let list: { name: string; role?: string }[] = [];
  // members?.map((member) => {
  //   const clanRole = member.roles.cache.find((item) =>
  //     clanRoles.includes(item.id)
  //   );
  //   list.push({
  //     name: member.nickname || member.displayName || member.user.username,
  //     role: clanRole?.name,
  //   });
  // });
  // writeFileSync(
  //   "./assets/advocates.csv",
  //   list.map((item) => `${item.name}, ${item.role || ""}`).join("\n")
  // );
  const channel = (await guild.channels.fetch(
    "846398942119329862"
  )) as TextChannel;
  // const file = new AttachmentBuilder("./assets/conflict.png");
  // const messageToEdit = await channel.messages.fetch("1011366953719451701");
  // messageToEdit.edit({
  //   content: `<@&872124401129246822>`,
  //   embeds: [
  //     {
  //       title: `Code of Conduct - Conflict Resolution Issue`,
  //       description: "",
  //       color: 0xfff700,
  //       fields: [
  //         {
  //           name: `Issue Name: `,
  //           value: `Code of Conduct - Conflict Resolution`,
  //         },
  //         {
  //           name: `Issue Description: `,
  //           value: `We spotted some people to people issues in the community. `,
  //         },
  //         {
  //           name: `Issue Domain: \n`,
  //           value: `Governance\n`,
  //         },
  //         {
  //           name: `Suggested Solution, if known: `,
  //           value: `A workflow that will help resolve people to people issues in the community.`,
  //         },
  //         {
  //           name: `Impact, if not solved: `,
  //           value: `You are now all part of the discussion about decision what to proceed next.\n\nWhat you think, you like, dislike, how to improve, any feedback you have now it's your time to input about this topic and about this workflow idea. \n\nWithout this we don’t have a robust & scalable conflict resolution model.`,
  //         },
  //         {
  //           name: `Artifacts & References:`,
  //           value: `Relevant Community Discussions Link:\nhttps://discord.com/channels/621759717756370964/920038810677575780/977319748025090111`,
  //         },
  //       ],
  //       image: {
  //         url: `attachment://conflict.png`,
  //       },
  //       url: `https://paper.dropbox.com/doc/Code-of-Conduct-Conflict-Resolution-Issue--Bmrjj_YZUMoaBsWYmRXzz6sdAg-CjwNqrxrFhyXj1yuFXmtJ`,
  //     },
  //   ],
  //   files: [file],
  // });

  await channel.send({
    content: "Wanna get or remove a clan role I gotcha!",
    components: [
      {
        type: ComponentType.ActionRow,
        components: [
          new ButtonBuilder()
            .setCustomId("toggle_turtle_role")
            .setEmoji("🐢")
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId("toggle_wolf_role")
            .setEmoji("🐺")
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId("toggle_bear_role")
            .setEmoji("🐻")
            .setStyle(ButtonStyle.Secondary),
        ],
      },
    ],
  });
});

client.on("interactionCreate", async (interaction) => {
  console.log("got interaction", interaction.type);
  if (interaction instanceof ButtonInteraction) {
    if (interaction.customId === "toggle_turtle_role") {
      await interaction.deferReply();
      const userId = interaction.user.id;
      const guild = await interaction.guild?.fetch();
      if (guild) {
        const member = await guild.members.fetch(userId);
        if (member.roles.cache.has("838942966692839435")) {
          member.roles.remove("838942966692839435");
        } else {
          member.roles.add("838942966692839435");
        }
      }
    } else if (interaction.customId === "toggle_wolf_role") {
    } else if (interaction.customId === "toggle_bear_role") {
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
