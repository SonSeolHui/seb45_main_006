import { commonApi } from "@api/common/commonApi";
import { withAuthApi } from "@api/common/withAuthApi";
import { COMMON_API_PATH } from "@api/constant";
import { GetReqAllInfo, PostReqInfo, PatchReqInfo, DeleteReqInfo, PostReqViewCount } from "@type/info/info.req.dto";

// 정보 게시판 - 리스트 조회
export const getAllInfo = async ({ search, category, page, size }: GetReqAllInfo) => {
    let url = `${COMMON_API_PATH.INFO.PATH}`;
    if (category) url += `/category/${category.toLowerCase()}`;
    url += `?page=${page}&size=${size}`;
    if (search) url += `&search=${search}`;

    const { data } = await commonApi.get(url);
    return data;
};

// 정보 게시판 - 등록
export const postInfo = async (requstObj: PostReqInfo) => {
    const url = `${COMMON_API_PATH.INFO.PATH}`;
    const { data } = await withAuthApi.post(url, requstObj);
    return data;
};

// 정보 게시판 - 수정 (본인이 작성한 글만 가능)
export const patchInfo = async ({ infoId, ...requstObj }: PatchReqInfo) => {
    const url = `${COMMON_API_PATH.INFO.PATH}/${infoId}`;
    const { data } = await withAuthApi.patch(url, requstObj);
    return data;
};

// 정보 게시판 - 삭제 (본인이 작성한 글만 가능)
export const deleteInfo = async ({ infoId }: DeleteReqInfo) => {
    const url = `${COMMON_API_PATH.INFO.PATH}/${infoId}`;
    const { data } = await withAuthApi.delete(url);
    return data;
};

// 정보 게시판 - 조회수 증가 - status code: 200
export const postViewCount = async ({ infoId }: PostReqViewCount) => {
    const url = `${COMMON_API_PATH.INFO.PATH}/${infoId}`;
    const { data } = await withAuthApi.post(url);
    return data;
};
