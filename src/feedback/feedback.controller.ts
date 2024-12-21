import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { SubmitFeedbackDto } from './dto/submit-feedback.dto';
import { SubmitSupportRequestDto } from './dto/submit-support-request.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('submit')
  submitFeedback(@Body() feedbackData: SubmitFeedbackDto) {
    return this.feedbackService.submitFeedback(feedbackData);
  }

  @Post('support-request')
  submitSupportRequest(@Body() supportData: SubmitSupportRequestDto) {
    return this.feedbackService.submitSupportRequest(supportData);
  }

  @Get('faq')
  getFAQs() {
    return this.feedbackService.getFAQs();
  }
}
