package WOOMOOL.DevSquad.infoboard.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

public class InfoBoardDto {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post {
        private Long memberId;

        private String title;

        private String content;

        private String category;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {
        private Long boardId;

        private Long memberId;

        private String title;

        private String content;

        private String category;
    }
    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long boardId;
        private String title;
        private String content;
        private Long memberId;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private int viewCount;
        private String category;
        private String infoBoardStatus;
    }
}
