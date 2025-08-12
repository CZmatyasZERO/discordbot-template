import { EmbedBuilder } from "discord.js"

export const modal: Modal = {
    name: "embedmodal",
    run: async (interaction, client) => {

        const title = interaction.fields.getTextInputValue("embed-title")
        const text = interaction.fields.getTextInputValue("embed-text")
        const color = interaction.fields.getTextInputValue("embed-color")
        const url = interaction.fields.getTextInputValue("embed-url")
        const thumbnail = interaction.fields.getTextInputValue("embed-thumbnail")
        const embed = new EmbedBuilder()
        
        if(title) embed.setTitle(title)
        if(color) embed.setColor(hexColorToInt(color))
        if(url) embed.setURL(url)
        if(thumbnail) embed.setThumbnail(thumbnail)
        embed.setDescription(text)

        interaction.reply({embeds: [embed]})

    }
}

function hexColorToInt(hex) {
    if (hex.charAt(0) === '#') {
        hex = hex.slice(1);
    }

    return parseInt(hex, 16);
}