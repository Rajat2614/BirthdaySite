import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface GiftDrop {
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
  emoji: string;
}

interface AnswerButton {
  label: string;
  next: string;
  /** primary = bright/encouraged, ghost = subtle */
  style?: 'primary' | 'ghost';
}

interface QuestionNode {
  emoji: string;
  text: string;
  sub?: string;
  buttons: AnswerButton[];
  /** marks the final celebratory reveal */
  final?: boolean;
}

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rsvp.html',
  styleUrl: './rsvp.css'
})
export class Rsvp implements OnInit {
  gifts: GiftDrop[] = [];
  currentKey = 'start';

  private readonly emojis = ['🎁', '🎀', '🎉', '🎈', '🥳', '🎊', '💝', '✨'];

  readonly nodes: Record<string, QuestionNode> = {
    start: {
      emoji: '🎁',
      text: 'Are you ready for your gift?',
      sub: 'Choose wisely, birthday girl 👀',
      buttons: [
        { label: 'Yes! 🎉', next: 'choose', style: 'primary' },
        { label: 'No', next: 'reallyNo', style: 'ghost' }
      ]
    },
    reallyNo: {
      emoji: '😱',
      text: "Really?? You don't want a gift?",
      sub: 'Who in the world says no to free stuff?!',
      buttons: [
        { label: 'Ok fine, yes 😅', next: 'choose', style: 'primary' },
        { label: 'Still no', next: 'stubborn', style: 'ghost' }
      ]
    },
    stubborn: {
      emoji: '🧐',
      text: 'Bold move... rejecting a gift on your OWN birthday?',
      sub: 'This is officially going in the history books 📖',
      buttons: [
        { label: 'Okay okay, I want it 🙈', next: 'choose', style: 'primary' },
        { label: 'Nope, never', next: 'noLoop', style: 'ghost' }
      ]
    },
    noLoop: {
      emoji: '🥲',
      text: 'Fine. No gift for you then...',
      sub: "...just kidding, you don't get to decide that 😏",
      buttons: [{ label: 'Continue ➜', next: 'choose', style: 'primary' }]
    },
    choose: {
      emoji: '🤔',
      text: 'Do you want a gift or best wishes?',
      sub: 'Tick tock, the suspense is unreal ⏳',
      buttons: [
        { label: 'Gift 🎁', next: 'pocket', style: 'primary' },
        { label: 'Best wishes 💌', next: 'wishes', style: 'primary' }
      ]
    },
    wishes: {
      emoji: '🥹',
      text: 'Awww, so humble and noble of you!',
      sub: 'Too bad though — you get a gift anyway.',
      buttons: [{ label: 'Show me 👀', next: 'reveal', style: 'primary' }]
    },
    pocket: {
      emoji: '😤',
      text: "You don't care about your sister's pocket, haa?",
      sub: 'Just gonna empty it out, huh? 🪙',
      buttons: [
        { label: 'HEHEHE 😈', next: 'wishlist', style: 'primary' },
        { label: 'Okay, no need 🥺', next: 'love', style: 'ghost' }
      ]
    },
    wishlist: {
      emoji: '🛍️',
      text: 'Okay then... what do you want?',
      sub: 'Pick your weapon, big spender 💸',
      buttons: [
        { label: 'iPhone 17 Pro Max 📱', next: 'funding', style: 'primary' },
        { label: 'AirPods 3 Pro 🎧', next: 'funding', style: 'primary' }
      ]
    },
    love: {
      emoji: '🥹',
      text: 'See... THIS is why I love you so much! 💖',
      sub: 'Sweetest sister award goes to you 🏆',
      buttons: [{ label: 'Aww, start over 🔄', next: 'start', style: 'ghost' }],
      final: true
    },
    funding: {
      emoji: '😅',
      text: "Okay okay... I'm a little short of ₹20,000.",
      sub: 'Might need some public funding for this one 🪙🙏',
      buttons: [{ label: 'Hahaha, start over 🔄', next: 'start', style: 'ghost' }],
      final: true
    },
    reveal: {
      emoji: '🥔',
      text: 'Your gift is... an Aaloo!',
      sub: 'Plus a lifetime supply of love, this whole website, and someone who thinks the world of you. Happy Birthday! 💖',
      buttons: [{ label: 'Start over 🔄', next: 'start', style: 'ghost' }],
      final: true
    }
  };

  get current(): QuestionNode {
    return this.nodes[this.currentKey];
  }

  ngOnInit(): void {
    this.gifts = Array.from({ length: 40 }, () => this.createGift());
  }

  pick(next: string): void {
    this.currentKey = next;
  }

  private createGift(): GiftDrop {
    return {
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 5,
      size: 24 + Math.random() * 28,
      rotate: Math.random() * 360,
      emoji: this.emojis[Math.floor(Math.random() * this.emojis.length)]
    };
  }
}
