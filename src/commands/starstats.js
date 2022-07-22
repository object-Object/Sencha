const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { getStarboardStats } = require('../helpers/dbModel');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('starstats')
		.setDescription('Prints starboard stats'),
	async execute(interaction) {
		const starboardStats = getStarboardStats();

		// console.log(starboardStats);

		starboardStats.topPosts[0] = starboardStats.topPosts[0] ? `🥇 [${starboardStats.topPosts[0].messageId}](${starboardStats.topPosts[0].messageUrl}) (${starboardStats.topPosts[0].reactionCount} stars)` : '🥇 N/A';
		starboardStats.topPosts[1] = starboardStats.topPosts[1] ? `🥈 [${starboardStats.topPosts[1].messageId}](${starboardStats.topPosts[1].messageUrl}) (${starboardStats.topPosts[1].reactionCount} stars)` : '🥈 N/A';
		starboardStats.topPosts[2] = starboardStats.topPosts[2] ? `🥉 [${starboardStats.topPosts[2].messageId}](${starboardStats.topPosts[2].messageUrl}) (${starboardStats.topPosts[2].reactionCount} stars)` : '🥉 N/A';

		starboardStats.topReceived[0] = starboardStats.topReceived[0] ? `🥇 ${await interaction.guild.members.fetch(starboardStats.topReceived[0].user)} (${starboardStats.topReceived[0].received} stars)` : '🥇 N/A';
		starboardStats.topReceived[1] = starboardStats.topReceived[1] ? `🥈 ${await interaction.guild.members.fetch(starboardStats.topReceived[1].user)} (${starboardStats.topReceived[1].received} stars)` : '🥈 N/A';
		starboardStats.topReceived[2] = starboardStats.topReceived[2] ? `🥉 ${await interaction.guild.members.fetch(starboardStats.topReceived[2].user)} (${starboardStats.topReceived[2].received} stars)` : '🥉 N/A';

		starboardStats.topGave[0] = starboardStats.topGave[0] ? `🥇 ${await interaction.guild.members.fetch(starboardStats.topGave[0].user)} (${starboardStats.topGave[0].gave} stars)` : '🥇 N/A';
		starboardStats.topGave[1] = starboardStats.topGave[1] ? `🥈 ${await interaction.guild.members.fetch(starboardStats.topGave[1].user)} (${starboardStats.topGave[1].gave} stars)` : '🥈 N/A';
		starboardStats.topGave[2] = starboardStats.topGave[2] ? `🥉 ${await interaction.guild.members.fetch(starboardStats.topGave[2].user)} (${starboardStats.topGave[2].gave} stars)` : '🥉 N/A';


		const embed = new EmbedBuilder()
			.setTitle('Server Starboard Stats')
			.setColor(0xfdd835)
			.setDescription(`${starboardStats.messageCount} messages starred with a total of ${starboardStats.totalStarCount ? starboardStats.totalStarCount : 0} stars`)
			.addFields([
				{ name: 'Top Starred Posts', value: `${starboardStats.topPosts[0]}\n${starboardStats.topPosts[1]}\n${starboardStats.topPosts[2]}` },
				{ name: 'Top Star Receivers', value:`${starboardStats.topReceived[0]}\n${starboardStats.topReceived[1]}\n${starboardStats.topReceived[2]}`, inline: true },
				{ name: 'Top Star Givers', value:`${starboardStats.topGave[0]}\n${starboardStats.topGave[1]}\n${starboardStats.topGave[2]}`, inline: true },
			]);
		return await interaction.reply({ embeds: [embed] });
	},
};