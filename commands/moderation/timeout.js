const ms = require("ms");

module.exports = {
    name: "timeout",
    category: "moderation",
    permissions: ["MANAGE_MESSAGES"],
    devOnly: false,
    run: async ({ client, message, args }) => {
        const target = message.mentions.users.first();
        if (!target) {
            return message.channel.send(`I couldn't timeout ${target}`);
        }

        /**
         * A bit tricky so let me explain
         *
         * - Destructuring: this equals to "args[1] & args[2] and args[0] is skipped"
         * - reason have a default value of "null" if nothing is provided to avoid additional type check
         */
        const [, limit, reason = null] = args;
        if (!limit) {
            return message.channel.send("No time limit defined, try again.");
        }

        function convertTime(ms) {
            const minutes = Math.floor(ms / 60_000);
            return minutes;
        }

        const memberTarget = message.guild.members.cache.get(target.id);
        let minute = 60_000;
        memberTarget.timeout(limit * minute, reason);
        message.channel.send(
            `${target} has been timed out for ${convertTime(
                limit * minute
            )} minutes`
        );
    },
};
