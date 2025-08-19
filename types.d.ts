import { Collection, Client, ChatInputCommandInteraction, ApplicationCommandOptionData, PermissionsString, ModalSubmitInteraction, ButtonInteraction } from "discord.js";

declare module "discord.js" {
  interface Client {
    slash: Collection<string, Command>;
    modals: Collection<string, Modal>;
    buttons: Collection<string, Button>;
  }
}


declare global {
    interface Command {
        name: string;
        description: string;
        options?: ApplicationCommandOptionData[];
        run: (interaction: ChatInputCommandInteraction, client: Client) => void;
        permissions?: PermissionsString;
        timeout?: number;
    }
    interface Modal {
        name: string;
        run: (interaction: ModalSubmitInteraction, client: Client) => void;
    }
    interface Button {
        name: string;
        run: (interaction: ButtonInteraction, client: Client) => void;
    }
}

