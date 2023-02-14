import { IgApiClient } from 'instagram-private-api'
import { FOLLOW_TIMEOUT } from './config.js'
import { sleep } from './utils.js'

const ig = new IgApiClient();


export class InstaBot {
    #username
    #password
    constructor(username, password) {
        this.#username = username;
        this.#password = password;
    }

    login() {
        ig.state.generateDevice(this.#username);
        return ig.account.login(this.#username, this.#password);
    }

    async getUsersList(accounts) {
        const totalFollowers = []
        for (const account of accounts) {
            const followers = await this.#getFollowersByUsername(account)
            totalFollowers.push(...followers)

        }
        const uniqueTotalFollowers = [...new Set(totalFollowers)]
        return uniqueTotalFollowers;
    }

    async follow(idsList) {
        for (let id of idsList) {
            console.log(`попытка подписаться на ${id}`)
            await ig.friendship.create(id)
            await sleep(FOLLOW_TIMEOUT)
        }
    }

    async #getFollowersById(userId) {
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

    async #getFollowersByUsername() {
        const userId = await ig.user.getIdByUsername(this.#username)
        if (!userId) {
            return []
        }
        const followers = await this.#getFollowersById(userId)
        return followers
    }
}


