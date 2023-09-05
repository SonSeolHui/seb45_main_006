package WOOMOOL.DevSquad.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

public class AnswerDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post {
        private Long memberId;

        private Long boardId;

        private String content;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {
        private Long answerId;

        private String content;

    }
    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long answerId;
        private Long memberId;
        private Long boardId;
        private Long title;
        private boolean isAccepted;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
