import {
    formatTokens,
    tokensOwnedFromBatch,
    bulkCheckBalance,
} from "./collection";

const USER_WITH_TOKENS = "0xdeB101B4117f41e28e061617626F24f22bc4d53e";
const USER_WITH_NO_TOKENS = "0xE2bbEDa60fEa6f7429444edC3f9Af28B2dE41695";
const TEST_TOKENS = [
    {
        id: 5,
        address: "0xf4680c917a873e2dd6ead72f9f433e74eb9c623c",
        description: "February 16th, 2021. The day Bitcoin soars past $50,000.",
        imageUrl:
            "https://lh3.googleusercontent.com/9QT8EDg2SmlEmmAk7i0BS8MWG72A3suhCv2MWGr3NCnbQanKcV_EiDik1J4ksjU8tKJyzbY2yt7wyCaxvL-afgiA92g0ooS7zBc-=s250",
        name: "Twerky Pepe #41 - $50k",
        tokenId: "36",
        slug: "twerky-pepe-41-50k",
        reserve: "12ETH",
        published_at: "2021-02-28T18:22:31.932Z",
        created_at: "2021-02-28T18:22:15.022Z",
        updated_at: "2021-03-17T15:41:06.891Z",
    },
    {
        id: 6,
        address: "0x495f947276749ce646f68ac8c248420045cb7b5e",
        description: null,
        imageUrl:
            "https://lh3.googleusercontent.com/6ovH6O-QpNq2D87FbNoDUgI4RwVnyj8bfbkefiLUIN2v9kEuOdgF9RReCgR-ovvqAcuvGneM_EIzcL6Xkhp7Bcc6Nnvi9WzarrqfzQ=s250",
        name: "Community Spotlight",
        tokenId:
            "88170941023983939473756233746161686074440532447362694659937317918787680337921",
        slug: "community-spotlight",
        reserve: null,
        published_at: "2021-03-02T13:49:50.494Z",
        created_at: "2021-03-02T13:49:45.027Z",
        updated_at: "2021-03-02T13:50:57.391Z",
    },
    {
        id: 7,
        address: "0x495f947276749ce646f68ac8c248420045cb7b5e",
        description: null,
        imageUrl:
            "https://lh3.googleusercontent.com/lb8QikpLZTJhEY5ncUO8xAaFWchJyDuvzQX6-3e0G9HX_e1MGfJIPdOKsnqry8MsQqlIfcq3FdMI-tivARxfNZm7dLvS1OT7-sG7Vtc=s250",
        name: "Git init",
        tokenId:
            "88170941023983939473756233746161686074440532447362694659937317919887191965697",
        slug: "git-init",
        reserve: null,
        published_at: "2021-03-17T14:48:36.867Z",
        created_at: "2021-03-17T14:48:32.535Z",
        updated_at: "2021-03-17T14:48:40.291Z",
    },
    {
        id: 8,
        address: "0x495f947276749ce646f68ac8c248420045cb7b5e",
        description: null,
        imageUrl:
            "https://lh3.googleusercontent.com/UFTy1buTAoXY8VqssI6XWCHeEEKvZv5gqKj3-HQCj2DlWPpw9F8G1eiduqzmz6FKobjKgTAEgoj5GKaUdCv9Dx9M3gWzpHE29VGh_g=s250",
        name: "Git Commit -m",
        tokenId:
            "88170941023983939473756233746161686074440532447362694659937317920986703593473",
        slug: "git-commit-m",
        reserve: null,
        published_at: "2021-03-17T15:00:26.182Z",
        created_at: "2021-03-17T15:00:21.247Z",
        updated_at: "2021-03-17T15:00:26.205Z",
    },
];

describe("formatTokens", () => {
    test("You get 2 keys", () => {
        const result = formatTokens(TEST_TOKENS);
        const keys = Object.keys(result);
        expect(keys.length).toBe(2);
    });
});

describe("balanceOfThisBatch", () => {
    test("Length of a user that has bought is greater than 0", async () => {
        const balances = await tokensOwnedFromBatch(
            USER_WITH_TOKENS,
            "0x495f947276749ce646f68ac8c248420045cb7b5e",
            TEST_TOKENS as any[],
        );

        expect(balances.length).toBeGreaterThan(0);
    });
    test("Length of a user that NEVR bought is 0", async () => {
        const balances = await tokensOwnedFromBatch(
            USER_WITH_NO_TOKENS,
            "0x495f947276749ce646f68ac8c248420045cb7b5e",
            TEST_TOKENS as any[],
        );

        expect(balances.length).toBe(0);
    });
});

describe("bulkCheckBalance", () => {
    test("bulkCheckBalance for user with tokens is greater than 0", async () => {
        const formatted = formatTokens(TEST_TOKENS);
        const check = await bulkCheckBalance(formatted, USER_WITH_TOKENS);
        expect(check.length).toBeGreaterThan(0);
    });
});
