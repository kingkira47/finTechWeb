import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { SupportRequest } from './feedback.entity';
import { SubmitFeedbackDto } from './dto/submit-feedback.dto';
import { SubmitSupportRequestDto } from './dto/submit-support-request.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    @InjectRepository(SupportRequest)
    private readonly supportRequestRepository: Repository<SupportRequest>,
  ) {}

  async submitFeedback(feedbackData: SubmitFeedbackDto) {
    const feedback = this.feedbackRepository.create({
      user: feedbackData.userId ? { id: feedbackData.userId } : null,
      message: feedbackData.message,
    });
    await this.feedbackRepository.save(feedback);
    return `Feedback submitted: ${feedbackData.message}`;
  }

  async submitSupportRequest(supportData: SubmitSupportRequestDto) {
    const request = this.supportRequestRepository.create({
      user: supportData.userId ? { id: supportData.userId } : null,
      subject: supportData.subject,
      message: supportData.message,
      contactEmail: supportData.contactEmail,
    });
    await this.supportRequestRepository.save(request);
    return `Support request submitted: ${supportData.subject}`;
  }

  async getFAQs() {
    return [
      {
        question: 'How do I reset my password?',
        answer: 'Go to the login page and click on "Forgot Password."',
      },
      {
        question: 'How can I contact support?',
        answer:
          'Use the "Contact Support" option in the app or email us at support@example.com.',
      },
    ];
  }
}
