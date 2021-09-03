const INITIAL_STATE = {
    postList: [] as any[],
    pagination: {
        page: 1,
        total: 0,
        q: "",
    },
    isEdited: false,
    editedPost: {
        post: "",
        postType: "TEXT",
        publicStatus: "FRIENDS",
        medias: [],
    },
};

export function postReducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "SET_EDIT_POST": {
            return {
                ...state,
                isEdited: action.payload.isEdited,
                editedPost: action.payload.editedPost,
            };
        }
        case "SET_POST_LIST": {
            return {
                ...state,
                postList: action.payload.postList,
                pagination: action.payload.pagination,
            };
        }
        case "UPDATE_POST": {
            const indexPost: any = state.postList.findIndex((e: any) => action.payload.id === e.id);
            if (indexPost !== -1) {
                const posts = [...state.postList];
                posts[indexPost] = action.payload;
                return {
                    ...state,
                    postList: posts,
                };
            }
            return {
                ...state,
            };
        }
        case "DELETE_POST": {
            const indexPost: any = state.postList.findIndex((e: any) => action.payload.id === e.id);
            if (indexPost !== -1) {
                const posts = [...state.postList];
                posts.splice(indexPost, 1);
                return {
                    ...state,
                    postList: posts,
                };
            }
            return {
                ...state,
            };
        }
        default:
            return state;
    }
}
