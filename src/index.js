
import { USERNAME, PASSWORD } from './config.js'
import { InstaBot } from './instabot.js';

const accounts = ['ira_vladuko', 'gunners__27']


async function main() {
    try {
        const bot = new InstaBot(USERNAME, PASSWORD);

        console.log('попытка войти в аккаунт...')
        await bot.login();
        console.log('вход успешно выполнен')


        console.log('попытка получения пользователей')
        const idsList = await bot.getUsersList(accounts);
        console.log(`получение пользователей успешно выполнено, найдено пользователей: ${idsList.length}`)

        console.log('старт подписок')
        await bot.follow(idsList);
        console.log(`подписки успешно отправлены`)
    }
    catch (error) {
        console.log(error);
    }
}

main()
