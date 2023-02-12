const { IgApiClient } = require('instagram-private-api')
const { username, password, defaultTimeout } = require('./config')

const ig = new IgApiClient();

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
        const usernameArr = followers.map((follower) => follower.username)
        followersArr.push(...usernameArr)
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

async function main() {
    try {
        await login()

        const totalFollowers = []

        const accounts = ['ira_vladuko', 'gunners__27', 'Timosha_22']

        for await (account of accounts) {
            const followers = await getFollowersByUsername(account)
            totalFollowers.push(...followers)
        }
        console.log(totalFollowers)

    }
    catch (error) {
        console.log(error);
    }
}

main()