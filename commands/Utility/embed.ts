
import { ApplicationCommandOptionType, Client, Interaction, ModalBuilder,TextInputBuilder, TextInputStyle,ActionRowBuilder, CommandInteraction} from "discord.js"


export const command: Command = {
    name: "embed",
    description: "creates embed messages",
	permissions: "Administrator",
    options: [
		
    ],
    timeout: 5000,
    run: async (interaction, client) => {
        const modal = new ModalBuilder()
			.setCustomId('embedmodal')
			.setTitle("Embed builder")

		// Create the text input components for modal
		const titleInput = new TextInputBuilder()
			.setCustomId('embed-title')
			.setLabel("Title")
			.setStyle(TextInputStyle.Short)
            .setRequired(false)

        const colorInput = new TextInputBuilder()
            .setCustomId("embed-color")
            .setLabel("Color")
            .setPlaceholder("#00000")
            .setStyle(TextInputStyle.Short)
            .setRequired(false)

		const textInput = new TextInputBuilder()
			.setCustomId('embed-text')
			.setLabel("Text")
			.setStyle(TextInputStyle.Paragraph)
            .setRequired(true)

		const urlInput = new TextInputBuilder()
			.setCustomId('embed-url')
			.setLabel("Url")
			.setStyle(TextInputStyle.Short)
            .setRequired(false)
			.setPlaceholder("https://google.com")
		
		const imageInput = new TextInputBuilder()
			.setCustomId('embed-thumbnail')
			.setLabel("Thumbnail url")
			.setStyle(TextInputStyle.Short)
            .setRequired(false)
			.setPlaceholder("https://example.com/image.jpg")

		
		// so you need one action row per text input. Modals allows only one text input per row
		const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(titleInput);
		const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(colorInput);
        const thirdActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(textInput);
		const fourthActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(urlInput);
		const fifthActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(imageInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

		// Show the modal to the user
		await interaction.showModal(modal);
    }
}

