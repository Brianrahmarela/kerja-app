let baseUrl = "http://localhost:7777";

// uat / prod
if (process.env.NODE_ENV === "production") {
    baseUrl = window.location.origin;
}

const baseUrlApi = baseUrl + "/api";
const baseUrlWs = baseUrl;
export const AppConfig = {
    baseUrlApi,
    baseUrlWs,
    recaptchaKey: !process.env.NODE_ENV || process.env.NODE_ENV === "development" ? "6LeecDsaAAAAAP6cBwmX-WFAqpgdWGMBbDJe0Jbu" : "6LeecDsaAAAAAP6cBwmX-WFAqpgdWGMBbDJe0Jbu",
    hashKey: "qFaqv?TB@Sdc6Erk!9_a",
    firebaseConfig: {
        apiKey: "AIzaSyBA2UE3aQWmOgTNBcPm-ddCARC75u9uYcQ",
        authDomain: "karirapp.firebaseapp.com",
        projectId: "karirapp",
        storageBucket: "karirapp.appspot.com",
        messagingSenderId: "201582228511",
        appId: "1:201582228511:web:7948ea99359063e6ae912a",
        measurementId: "G-RLS397RKBH",
    },
    url: {
        postLogin: baseUrlApi + "/ka-auth/v1/login",
        postRegister: baseUrlApi + "/ka-auth/v1/register",
        getMe: baseUrlApi + "/ka-auth/v1/me",
        getLogout: baseUrlApi + "/ka-auth/v1/logout",
        postForgotPassword: baseUrlApi + "/ka-account/v1/forgot-password",
        postResetPassword: baseUrlApi + "/ka-account/v1/reset-password",
        getBgProfile: baseUrlApi + "/ka-account/v1/bg-profile",
        getFeed: baseUrlApi + "/ka-socialmedia/v1/feed",
        postReaction: baseUrlApi + "/ka-socialmedia/v1/reaction",
        postComment: baseUrlApi + "/ka-socialmedia/v1/comment",
        postSubComment: baseUrlApi + "/ka-socialmedia/v1/reply-comment",
        getCommentPost: baseUrlApi + "/ka-socialmedia/v1/comment",
        getCommentReplies: baseUrlApi + "/ka-socialmedia/v1/comment-replies",
        postEditPost: baseUrlApi + "/ka-socialmedia/v1/post-edit",
        postPersonalInfo: baseUrlApi + "/ka-jobseeker/v1/my-profile",
        getPersonalInfo: baseUrlApi + "/ka-jobseeker/v1/my-profile",
        getHeaderPersonalInfo: baseUrlApi + "/ka-jobseeker/v1/header-info/",
        getProfile: baseUrlApi + "/ka-auth/v1/profile",
        getPositionTitle: baseUrlApi + "/ka-jobseeker/v1/position-titles",
        getExperiences: baseUrlApi + "/ka-jobseeker/v1/experiences",
        postExperience: baseUrlApi + "/ka-jobseeker/v1/experience",
        deleteExperience: baseUrlApi + "/ka-jobseeker/v1/experience",
        getEducations: baseUrlApi + "/ka-jobseeker/v1/educations",
        postEducation: baseUrlApi + "/ka-jobseeker/v1/education",
        deleteEducation: baseUrlApi + "/ka-jobseeker/v1/education",
        getSkills: baseUrlApi + "/ka-jobseeker/v1/skills",
        postSkill: baseUrlApi + "/ka-jobseeker/v1/skill",
        getSkillName: baseUrlApi + "/ka-jobseeker/v1/skill-names",
        getLanguages: baseUrlApi + "/ka-jobseeker/v1/languages",
        postLanguage: baseUrlApi + "/ka-jobseeker/v1/language",
        getLanguageName: baseUrlApi + "/ka-jobseeker/v1/language-names",
        getCertifications: baseUrlApi + "/ka-jobseeker/v1/certifications",
        postCertification: baseUrlApi + "/ka-jobseeker/v1/certification",
        deleteCertification: baseUrlApi + "/ka-jobseeker/v1/certification",
        getInstititionNames: baseUrlApi + "/ka-jobseeker/v1/institution-names",
        getJobWish: baseUrlApi + "/ka-jobseeker/v1/job-wishe",
        postJobWish: baseUrlApi + "/ka-jobseeker/v1/job-wishe",
        getPrivacySetting: baseUrlApi + "/ka-account/v1/privacy-setting",
        postPrivacySetting: baseUrlApi + "/ka-account/v1/privacy-setting",
        getMyResume: baseUrlApi + "/ka-jobseeker/v1/my-resume",

        postJobVacation: baseUrlApi + "/ka-employer/v1/job-vacation",
        getJobVacationDetail: baseUrlApi + "/ka-employer/v1/job-vacation",
        getJobVacation: baseUrlApi + "/ka-employer/v1/search-job-vacation",
        postJobApplication: baseUrlApi + "/ka-employer/v1/submit-job-application",
        getMyApplicationJob: baseUrlApi + "/ka-employer/v1/my-job-application",
        getTineline: baseUrlApi + "/ka-employer/v1/candidate-timeline",
        postApplicationWidthraw: baseUrlApi + "/ka-employer/v1/widthraw-application",
        postJobBookmark: baseUrlApi + "/ka-employer/v1/job-bookmark",
        getJobBookmark: baseUrlApi + "/ka-employer/v1/job-bookmark",
        getSearchCompany: baseUrlApi + "/ka-employer/v1/company",
        getFeaturedCompany: baseUrlApi + "/ka-employer/v1/company-featured",
        getCompanyDetail: baseUrlApi + "/ka-employer/v1/company-detail/",
        postCompanhyLike: baseUrlApi + "/ka-employer/v1/company-like",
        postCompanhyFollow: baseUrlApi + "/ka-employer/v1/company-follow",
        getCompanhyLike: baseUrlApi + "/ka-employer/v1/company-like/",
        getCompanhyFollow: baseUrlApi + "/ka-employer/v1/company-follow/",
        getUserSuggestion: baseUrlApi + "/ka-account/v1/user-suggestion",
        postFollowUser: baseUrlApi + "/ka-account/v1/follow-user",
        postUserSetting: baseUrlApi + "/ka-account/v1/user-setting",
        getUserSetting: baseUrlApi + "/ka-account/v1/user-setting",
        getFollowRequest: baseUrlApi + "/ka-account/v1/following-request",
        postAcceptRequest: baseUrlApi + "/ka-account/v1/follow-accept",
        postAcceptReject: baseUrlApi + "/ka-account/v1/follow-reject",
        postUnFollow: baseUrlApi + "/ka-account/v1/unfollow-user",
        getFollower: baseUrlApi + "/ka-account/v1/follower/",
        getFollowing: baseUrlApi + "/ka-account/v1/following/",
        postPhotoProfile: baseUrlApi + "/ka-account/v1/photo-profile",
        postBgProfile: baseUrlApi + "/ka-account/v1/change-bg-profile",
        postPosting: baseUrlApi + "/ka-socialmedia/v1/post",
        deletePost: baseUrlApi + "/ka-socialmedia/v1/post",
        getSinglePost: baseUrlApi + "/ka-socialmedia/v1/post/",
        getCheckLastPost: baseUrlApi + "/ka-socialmedia/v1/post-check/",
        getNewestStatus: baseUrlApi + "/ka-socialmedia/v1/post-newest/",
        getSpesificUserPosts: baseUrlApi + "/ka-socialmedia/v1/user-posts/",
        postStatusPhoto: baseUrlApi + "/ka-socialmedia/v1/media-post",
        getMediaCollectionPreview: baseUrlApi + "/ka-socialmedia/v1/media-collection-preview",
        getMediaPost: baseUrlApi + "/ka-socialmedia/v1/media-post",
        getPostLikes: baseUrlApi + "/ka-socialmedia/v1/post-likes/",
        getProfileInfo: baseUrlApi + "/ka-jobseeker/v1/public-profile-info",
        getPublicPersonalInfo: baseUrlApi + "/ka-jobseeker/v1/public-personal-info",
        getNotificationUnread: baseUrlApi + "/notification/v1/notification-unread",
        getAllNotification: baseUrlApi + "/notification/v1/notification",
        postNotificationAsRead: baseUrlApi + "/notification/v1/notification-set-read",
        getActivationUser: baseUrlApi + "/ka-account/v1/activate-user/",
        getNotificationCheck: baseUrlApi + "/notification/v1/notification-check/",
        postJobApplicationAttachment: baseUrlApi + "/ka-employer/v1/include-file",
    },
};
