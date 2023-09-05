package WOOMOOL.DevSquad.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class CommentDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post {
        private Long memberId;
        private Long boardId;
        private Long parentId;
        private String content;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {
        private Long commentId;
        private Long memberId;
        private Long boardId;
        private Long parentId;
        private Long content;
    }
    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long commentId;
        private Long memberId;
        private Long boardId;
        private Long parentId;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private List<CommentDto.Response> commentList = new ArrayList<>();
    }
}
