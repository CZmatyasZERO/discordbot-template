import { Client, GatewayIntentBits, EmbedBuilder, Collection, ModalSubmitInteraction, GuildMember, CommandInteraction, ButtonInteraction, ActivityType } from 'discord.js'
import { defLog } from "streamlogs"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v10"
import "dotenv/config"
import fs from "fs"

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildIntegrations,
        // Insert all intents here
    ]
})
const Timeout = new Set()
client.slash = new Collection()
client.modals = new Collection()
const commands = []

fs.readdirSync("./commands/").forEach(async (item) => {
    if(fs.lstatSync("./commands/" + item).isDirectory()) {
        fs.readdirSync("./commands/" + item).map(async item2 => {
            commands.push((await import("./commands/" + item + "/" + item2)).command)
        })
    } else {
        commands.push((await import("./commands/" + item)).command)
    }
})

fs.readdirSync("./modals/").forEach(async (item) => {
    const modal = ((await import("./modals/" + item)).modal)
    client.modals.set(modal.name, modal)
    defLog.info(modal.name + " loaded!", "modal-loader")
})

fs.readdirSync("./buttons/").forEach(async (item) => {
    const button = ((await import("./buttons/" + item)).button)
    client.buttons.set(button.name, button)
    defLog.info(button.name + " loaded!", "button-loader")
})


setTimeout(() => {
    commands.forEach(cmd => {
        if(cmd.name) {
            client.slash.set(cmd.name, cmd)
            defLog.info(cmd.name + " loaded!", "cmd-loader")
        }
    })

    const rest = new REST().setToken(process.env.token);

    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(process.env.botID),
                { body: commands }
            )
            defLog.info("Successfully reloaded application (/) commands.", "cmd-loader")
        } catch (error) {
            defLog.error(error, "cmd-loader")
        }
    })();
}, 2000)








client.on("ready", () => {
    defLog.info(`Logged in as ${client.user.tag}!`, "App")
    client.user.setActivity({name: "Hello!", type: ActivityType.Playing})
})


client.on("interactionCreate", async (interaction) => {
    if(interaction.isButton()) {
        interaction as ButtonInteraction
        if(!client.buttons.has(interaction.customId)) return
        const button = client.buttons.get(interaction.customId)
        button.run(interaction, client)
    } else if (interaction.isCommand() || interaction.isContextMenuCommand()) {
        interaction as CommandInteraction
        if (!client.slash.has(interaction.commandName)) return
        if (!interaction.guild) return
        commandrun(interaction.commandName, interaction)
    } else if (interaction.isModalSubmit()) {
        interaction as ModalSubmitInteraction
        if(!client.modals.has(interaction.customId)) return
        const modal = client.modals.get(interaction.customId)
        modal.run(interaction, client)
    }

    async function commandrun(name, interaction: CommandInteraction) {
        const command = client.slash.get(name)
        const member = interaction.member as GuildMember
        try {
            if (command.timeout) {
                if (Timeout.has(`${interaction.user.id}${command.name}`)) {
                    return interaction.reply({ content: `You need to wait **${command.timeout} ms** to use command again`, ephemeral: true })
                }
            }
            if (command.permissions) {
                if (!member.permissions.has(command.permissions)) {
                    return interaction.reply({ content: `:x: You need \`${command.permissions}\` to use this command`, ephemeral: true })
                }
            }
            command.run(interaction, client)
            Timeout.add(`${interaction.user.id}${command.name}`)
            setTimeout(() => {
                Timeout.delete(`${interaction.user.id}${command.name}`)
            }, command.timeout)
        } catch (error) {
            defLog.error(error, "App")
            await interaction.reply({ content: ":x: There was an error while executing this command!", ephemeral: true })
        }
    }
})


client.login(process.env.token)