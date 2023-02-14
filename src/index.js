import { IgApiClient } from 'instagram-private-api'
import { USERNAME, PASSWORD, DEFAULT_TIMEOUT, FOLLOW_TIMEOUT } from './config.js'

const ig = new IgApiClient();

const accounts = ['ira_vladuko', 'gunners__27']

async function main() {
    try {
        console.log('попытка войти в аккаунт...')
        await login();
        console.log('вход успешно выполнен')

        console.log('попытка получения пользователей')
        const idsList = await getUsersList(accounts);
        console.log(`получение пользователей успешно выполнено, найдено пользователей: ${idsList.length}`)

        console.log('старт подписок')
        await follow(idsList);
        console.log(`подписки успешно отправлены`)
    }
    catch (error) {
        console.log(error);
    }
}

main()

function login() {
    ig.state.generateDevice(USERNAME);
    return ig.account.login(USERNAME, PASSWORD);
}


const sleep = (ms = DEFAULT_TIMEOUT) => new Promise(resolve => setTimeout(resolve, ms))


async function getFollowersById(userId) {
    const followersArr = []
    const feed = await ig.feed.accountFollowers(userId);
    do {
        const followers = await feed.items()
        const ids = followers.map((follower) => follower.pk)
        followersArr.push(...ids)
        await sleep()

    } while (feed.isMoreAvailable())
    return followersArr
}

async function getFollowersByUsername(USERNAME) {
    const userId = await ig.user.getIdByUsername(USERNAME)
    if (!userId) {
        return []
    }
    const followers = await getFollowersById(userId)
    return followers
}

async function getUsersList(accounts) {
    const totalFollowers = []
    for (const account of accounts) {
        const followers = await getFollowersByUsername(account)
        totalFollowers.push(...followers)

    }
    const uniqueTotalFollowers = [...new Set(totalFollowers)]
    return uniqueTotalFollowers;
}

async function follow(idsList) {
    for (let id of idsList) {
        console.log(`попытка подписаться на ${id}`)
        await ig.friendship.create(id)
        await sleep(FOLLOW_TIMEOUT)
    }
}
