import { AppConfig } from "../config/Config";
import axios from "../config/Axios";
export const getMyResume = () => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getMyResume, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getPersonal = () => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getPersonalInfo, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getBiography = () => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getBiography, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getHeaderPersonal = (encodedId: string) => {
    console.log(encodedId);
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getHeaderPersonalInfo + encodedId, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getSidePersonal = (encodedId: string) => {
    console.log(encodedId);
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getSidePersonalInfo + encodedId, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const postPersonal = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postPersonalInfo, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const postBiography = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postBiography, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getPositionTitles = (keyword: string) => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getPositionTitle + "?q=" + keyword, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getOrganizations = () => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getOrganizations, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const postOrganization = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postOrganization, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getExperiences = () => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getExperiences, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const postExperience = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postExperience, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const deleteExperience = (id: any) => {
    const token = window.localStorage.getItem("token");
    return axios.delete(AppConfig.url.deleteExperience + "?id=" + id, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getEducations = () => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getEducations, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const postEducation = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postEducation, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const deleteEducation = (id: any) => {
    const token = window.localStorage.getItem("token");
    return axios.delete(AppConfig.url.deleteEducation + "?id=" + id, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getSkills = () => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getSkills, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const postSkill = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postSkill, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getSkillName = (keyword: string) => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getSkillName + "?q=" + keyword, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getLanguages = () => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getLanguages, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const postLanguage = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postLanguage, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getLanguageName = (keyword: string) => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getLanguageName + "?q=" + keyword, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getInstitutionName = (keyword: string) => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getInstititionNames + "?q=" + keyword, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getCertifications = () => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getCertifications, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const postCertification = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postCertification, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const deleteCertification = (id: any) => {
    const token = window.localStorage.getItem("token");
    return axios.delete(AppConfig.url.deleteCertification + "?id=" + id, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getJobWish = () => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getJobWish, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const postJobWish = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postJobWish, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getPrivacySetting = () => {
    const token = window.localStorage.getItem("token");
    return axios.get(AppConfig.url.getPrivacySetting, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const postPrivacySetting = (payload: any) => {
    const token = window.localStorage.getItem("token");
    return axios.post(AppConfig.url.postPrivacySetting, payload, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
