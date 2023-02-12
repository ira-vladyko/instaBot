const { IgApiClient } = require('instagram-private-api')

const ig = new IgApiClient();

function login() {
    ig.state.generateDevice('');
    return ig.account.login('', '');
}

async function main() {
    try {
        const result = await login()
        //console.log(result)
        const myId = await ig.user.getIdByUsername('')
        console.log(myId)


        // const getFolowers = await ig.
        // console.log(getFolowers)

        ///н404 Not Found
        //const iraInfo = await ig.user.accountDetails(iraId)
        //console.log(iraInfo)

        //выдает undefined
        // const info = await ig.user.arlinkDownloadInfo()
        // console.log(info)

        //404 Not Found
        // const info = await ig.user.flagUser(iraId)
        // console.log(info)

        //404 Not Found
        // const info = await ig.user.formerUsernames(iraId)
        // console.log(info)

        //404 Not Found
        // const info = await ig.user.info(iraId)
        // console.log(info)


        //?!
        // const info = await ig.user.lookup('merhallon')
        // console.log(info)

        //works
        // const info = await ig.user.search('merhallon')
        // console.log(info)

        //works
        // const info = await ig.user.searchExact('merhallon')
        // console.log(info)

        //404 not Found
        // const info = await ig.user.sharedFollowerAccounts('ira_vladuko')
        // console.log(info)

        //works
        // const info = await ig.user.usernameinfo('ira_vladuko')
        // console.log(info)

        // const followers = await ig.friendship.getFollowers(iraId);
        // console.log(followers);


        // const followersArr = []
        // const feed = await ig.feed.accountFollowers(myId)

        // const followers = await feed.items()
        // followersArr.push(...followers.map(f => f.username))
        // await new Promise((resolve) => {
        //     setTimeout(() => resolve('test'), 3000)
        // })
        // const followers2 = await feed.items()
        // followersArr.push(...followers2.map(f => f.username))
        // await new Promise((resolve) => {
        //     setTimeout(() => resolve('test'), 3000)
        // })
        // const followers3 = await feed.items()
        // followersArr.push(...followers3.map(f => f.username))
        // await new Promise((resolve) => {
        //     setTimeout(() => resolve('test'), 3000)
        // })

        // console.log(followersArr)
        // console.log((new Set(followersArr)).size)

        // const feed2 = await ig.feed.accountFollowers({ id: myId, query: 'next_max_id=130' })
        // const response2 = await feed2.request()
        // const followersCount2 = response2.users.length
        // console.log(followersCount2)


        // const followersUsersNames = followers.map((follower) => follower.username)
        //const followers = await feed.request()
        // console.log(followersUsersNames, followersUsersNames.length)














    }
    catch (error) {
        console.log(error);
    }
}

main()