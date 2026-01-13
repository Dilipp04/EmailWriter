package com.email.writer;

import lombok.Data;

@Data
public class EmailRequest {
//    Request body data
    private String emailContent;
    private String tone;
}
