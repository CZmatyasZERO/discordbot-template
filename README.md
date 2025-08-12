# Discord Bot Template

A simple, fully-typed **Discord bot template** built with TypeScript that supports **slash commands**, **buttons**, and **modals**.

The repository includes an example slash command and a modal for creating an embed message.

---

## ✨ Features

* **Automatic Slash Command Registration**
  Automatically initializes and updates slash commands when the bot starts.
* **Automatic Module Loading**
  Loads slash commands, buttons, and modals from their respective folders without manual imports.
* **Full TypeScript Support**
  All structures are fully typed for better development experience.
* **Permission Handling & Command Timeouts**
  Built-in permission checks and timeout support for commands.

---

## 📂 Project Structure

### **Commands**

* Located in `./commands`.
* Supports **one level of subfolders**.
* Files must have a `.ts` extension.
* Each command file should export an object like this:

```typescript
export const command: Command = {
    name: "commandname",
    description: "Example command",
    permissions: "Administrator", // Leave undefined if not required
    options: [
        {
            name: "songname",
            description: "Enter the name of your song",
            type: 3, // Use ApplicationCommandOptionType enum from discord.js
            required: true
        }
    ],
    timeout: 5000, // milliseconds
    run: async (interaction, client) => {
        // Your code here
    }
}
```

---

### **Buttons & Modals**

* Located in `./buttons` and `./modals`.
* **No subfolders** supported.
* The `name` property must match the `customId` used when creating the component.
* Example button module:

```typescript
export const button: Button = {
    name: "buttonname", // customId
    run: async (interaction, client) => {
        // Your code here
    }
}
```

* Example modal module:

```typescript
export const modal: Modal = {
    name: "modalname", // customId
    run: async (interaction, client) => {
        // Your code here
    }
}
```

---

## 🛠 Notes

* Keep command, button, and modal names consistent with their respective `customId` values.
* For slash command options, use the `ApplicationCommandOptionType` enum from `discord.js` for clarity and maintainability.
