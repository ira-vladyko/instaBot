const { IgApiClient } = require('instagram-private-api')
const { username, password, defaultTimeout, followTimeout } = require('./config')

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
    ig.state.generateDevice(username);
    return ig.account.login(username, password);
}

function sleep(ms = defaultTimeout) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

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

async function getFollowersByUsername(username) {
    const userId = await ig.user.getIdByUsername(username)
    if (!userId) {
        return []
    }
    const followers = await getFollowersById(userId)
    return followers
}

async function getUsersList(accounts) {
    const totalFollowers = []
    for await (const account of accounts) {
        const followers = await getFollowersByUsername(account)
        totalFollowers.push(...followers)
    }
    const uniqueTotalFollowers = [...new Set(totalFollowers)]
    return uniqueTotalFollowers;
}

async function follow(idsList) {
    for await (let id of idsList) {
        console.log(`попытка подписаться на ${id}`)
        await ig.friendship.create(id)
        await sleep(followTimeout)
    }
}
