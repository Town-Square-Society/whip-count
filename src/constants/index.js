
const ELECTION_STATUS_KEY = "electionAcknowledgmentStatus";
const SCOTUS_STATUS_KEY = "status";
const NOMINEE_STATUS_KEY = "nomineeStatus";
const IMPEACHMENT_STATUS_KEY = "impeachmentTrialStatus";
const FILIBUSTER_STATUS_KEY = "filibusterReformStatus";
const DC_STATEHOOD_STATUS_KEY = "dcStatehoodStatus";
const HR1_STATUS_KEY = "hr1Status";
const HR4_STATUS_KEY = "hr4Status";

export const TRACKED_ISSUES = [{
    key: FILIBUSTER_STATUS_KEY,
    header: "Filibuster Reform",
    link: "#filibuster",
    description: "Do your Senators support reforming the 60-vote legislative filibuster?",
    aboutLinkText: "Learn about the filibuster.",
    aboutLinkHref: "https://www.senate.gov/artandhistory/history/common/briefing/Filibuster_Cloture.htm",
    markerPosition: [50, 60], 
}, {
    key: DC_STATEHOOD_STATUS_KEY,
    header: "D.C. Statehood",
    link: "#dc-statehood",
    description: "Do your Senators support statehood for Washington, D.C.?",
    aboutLinkText: "See legislative details.",
    aboutLinkHref: "https://www.congress.gov/bill/116th-congress/house-bill/51",
    markerPosition: [50, 60],
}, {
    key: HR1_STATUS_KEY,
    header: "For the People Act",
    link: "#hr1",
    description: "Do your Senators support expanding Americans voting access and limiting the influence of money in our elections?",
    aboutLinkText: "See legislative details.",
    aboutLinkHref: "https://www.congress.gov/bill/117th-congress/senate-bill/1",
    markerPosition: [50, 60],

}, {
    key: HR4_STATUS_KEY,
    header: "John Lewis Voting Rights Advancement Act",
    link: "#hr4",
    description: "Do your Senators support restoring and expanding the Voting Rights Act?",
    aboutLinkText: "See legislative details.",
    aboutLinkHref: "https://www.leahy.senate.gov/imo/media/doc/John%20Lewis%20Voting%20Rights%20Advancement%20Act%20one%20pager.pdf",
    markerPosition: [50, 60],
}]

export const STATUS_TO_SHOW = IMPEACHMENT_STATUS_KEY;

const DC_STATEHOOD_STATUS_TYPE_LIST = [
    "Supports D.C. Statehood",
    "Open to D.C. Statehood",
    "Position unknown",
    "",
    "Opposed to D.C. Statehood"
];

const HR1_STATUS_TYPE_LIST = [
    "Supports H.R. 1",
    "Open to H.R. 1",
    "Position unknown",
    "",
    "Opposed to H.R. 1"
];

const HR4_STATUS_TYPE_LIST = [
    "Supports H.R. 4",
    "Open to H.R. 4",
    "Position unknown",
    "",
    "Opposed to H.R. 4"
];

const FILIBUSTER_STATUS_TYPE_LIST = [
    "Supports eliminating legislative filibuster",
    "Open to filibuster reform",
    "Position unknown",
    "",
    "Opposed to filibuster reform"
];

const IMPEACHMENT_STATUS_TYPE_LIST = [
    "Expected to vote to convict",
    "Supported House impeachment",
    "Position unknown",
    "Voted that trial is unconstitutional",
    "Opposes conviction"
]

const ELECTION_STATUS_TYPE_LIST = [
    "Voting to certify Biden's Electoral College victory",
    "Calls to begin transition processes",
    "Calls for Biden to receive Security Briefings",
    "No comment or vague comments",
    "Voting against certification of Biden's Electoral College victory"
]

const SHORT_ELECTION_STATUS_TYPE_LIST = [
    "Voting to certify Biden's Electoral College victory",
    "Calls for transition processes",
    "Calls for security briefings",
    "No comment or vague comments",
    "Voting against certification"
]

const STATUS_TYPES_LIST = [
    "Do not consider nominee - winner of 2020 Election should choose",
    "Consider nominee but only after Election",
    "Not on record",
    "Consider new nominee",
    "Other status",
    "Unknown"
];

const NOMINEE_STATUS_TYPES_LIST = [
    "Will vote against confirmation",
    "Leaning against confirmation",
    "Undecided or unknown",
    "Leaning to confirm",
    "Will vote to confirm",
]
const SHORT_NOMINEE_STATUS_TYPES_LIST = [
    "Will vote against Barrett",
    "Leaning against",
    "Undecided or unknown",
    "Leaning to confirm",
    "Will confirm Barrett",
];

const SHORT_STATUS_TYPES_LIST = [
    "Wait until 2021",
    "Wait until after election",
    "Not yet on record",
    "Consider nominee now",
    "Other",
    "Unknown"
];

export const STATUS_MAPPING = {
    [ELECTION_STATUS_KEY]: {
        shortStatus: SHORT_ELECTION_STATUS_TYPE_LIST,
        longStatus: ELECTION_STATUS_TYPE_LIST
    },
    [NOMINEE_STATUS_KEY]: {
        shortStatus: SHORT_NOMINEE_STATUS_TYPES_LIST,
        longStatus: NOMINEE_STATUS_TYPES_LIST
    },
    [SCOTUS_STATUS_KEY]:{
        shortStatus: SHORT_STATUS_TYPES_LIST,
        longStatus: STATUS_TYPES_LIST
    },
    [IMPEACHMENT_STATUS_KEY]: {
        shortStatus: IMPEACHMENT_STATUS_TYPE_LIST,
        longStatus: IMPEACHMENT_STATUS_TYPE_LIST
    },
    [DC_STATEHOOD_STATUS_KEY]: {
        shortStatus: DC_STATEHOOD_STATUS_TYPE_LIST,
        longStatus: DC_STATEHOOD_STATUS_TYPE_LIST
    },
    [HR1_STATUS_KEY]: {
        shortStatus: HR1_STATUS_TYPE_LIST,
        longStatus: HR1_STATUS_TYPE_LIST
    },
    [HR4_STATUS_KEY]: {
        shortStatus: HR4_STATUS_TYPE_LIST,
        longStatus: HR4_STATUS_TYPE_LIST
    },
    [FILIBUSTER_STATUS_KEY]: {
        shortStatus: FILIBUSTER_STATUS_TYPE_LIST,
        longStatus: FILIBUSTER_STATUS_TYPE_LIST
    }
}

const DARK_PURPLE = "#542788"
const MED_PURPLE = "#998ec3"
// const LIGHT_PURPLE = "#c8afdf";
const GRAY = "#c3c3c3"
// const LIGHT_ORANGE = "#fee0b6"
const MED_ORANGE = "#f1a340"
const DARK_ORANGE = "#e66101"

export const STATUS_COLORS = {
    1: DARK_PURPLE,
    2: MED_PURPLE,
    3: GRAY,
    4: MED_ORANGE,
    5: DARK_ORANGE,
}

export const STATUS_COLORS_PROGRESS = {
    1: DARK_PURPLE,
    2: MED_PURPLE,
    3: GRAY,
    4: MED_ORANGE,
    5: DARK_ORANGE,
}

export const SHORT_STATUS_TYPES = STATUS_MAPPING[STATUS_TO_SHOW].shortStatus.reduce((acc, status, index) => {
    acc[index + 1] = status;
    return acc;
}, {})

export const STATUS_TYPES = STATUS_MAPPING[STATUS_TO_SHOW].longStatus.reduce((acc, status, index, array) => {
    acc[index + 1] = status;
    return acc;
}, {})

export const STATUS_DISPLAY = STATUS_MAPPING[STATUS_TO_SHOW].longStatus.map((status, index) => {
    return {
        value: index + 1,
        text: status,
    }
})
