
import type { LucideIcon } from 'lucide-react';
import { HeartHandshake, Zap, ShieldQuestion, Activity, BedDouble, Brain } from 'lucide-react';

export enum NervousSystemType {
  DeeplyFeeling = "Deeply Feeling / Sensitive Child",
  HighlyReactive = "Highly Reactive / Big Reactor Child",
  SlowToWarmUp = "Slow to Warm Up / Cautious Child",
  HighEnergy = "High Energy / Sensory Seeking Child",
  LowEnergy = "Low Energy / Sensory Avoidant Child",
  EmotionallySelfContained = "Emotionally Self-Contained / Steady Child",
}

export type Question = {
  id: string;
  text: string;
};

export type TypeSection = {
  type: NervousSystemType;
  title: string;
  questionnaireTitle?: string; // Added for simplified display in questionnaire
  icon: LucideIcon;
  questions: Question[];
  description: string;
};

export const questionnaireData: TypeSection[] = [
  {
    type: NervousSystemType.DeeplyFeeling,
    title: "Type 1: Deeply Feeling / Sensitive",
    questionnaireTitle: "Type 1",
    icon: HeartHandshake,
    questions: [
      { id: "t1_q1", text: "When upset, does your child express their feelings intensely-like crying hard, needing to talk about it, or needing a lot of comfort?" },
      { id: "t1_q2", text: "When another child is upset, does your child get emotionally involved-feeling sad, worried, or wanting to help right away?" },
      { id: "t1_q3", text: "When your child wants something, do they get upset if they can't have it-sometimes feeling big disappointment or sadness?" },
      { id: "t1_q4", text: "When there's a change in plans, does your child get emotional-like crying, worrying, or needing extra support?" },
      { id: "t1_q5", text: "When your child makes a mistake, do they show strong feelings-like guilt, shame, or needing reassurance?" },
      { id: "t1_q6", text: "When excited, does your child want to share their excitement-talking a lot, hugging, or showing big reactions?" },
      { id: "t1_q7", text: "Does your child build strong connections to people or things-like loving a particular toy or having strong attachments to friends?" },
    ],
    description: "Deeply Feeling children are highly empathetic and sensitive to emotional nuances. They feel things intensely and may need support in navigating their rich inner world. They often possess great compassion and creativity."
  },
  {
    type: NervousSystemType.HighlyReactive,
    title: "Type 2: Highly Reactive / Big Reactor",
    questionnaireTitle: "Type 2",
    icon: Zap,
    questions: [
      { id: "t2_q1", text: "When upset, does your child react immediately-like yelling, crying, or complaining right away?" },
      { id: "t2_q2", text: "When another child is upset, does your child react quickly-like asking questions, trying to help, or getting upset too?" },
      { id: "t2_q3", text: "When your child wants something, do they get very upset if they can't have it-like insisting or demanding right away?" },
      { id: "t2_q4", text: "When there's a change in plans, does your child show strong emotions-like frustration, tears, or refusal?" },
      { id: "t2_q5", text: "When your child makes a mistake, do they react with big emotions-like yelling, crying, or getting very upset?" },
      { id: "t2_q6", text: "When excited, does your child react quickly-like jumping, talking loudly, or getting very active?" },
      { id: "t2_q7", text: "Does your child often have quick, intense emotional reactions to many situations?" },
    ],
    description: "Highly Reactive children experience emotions with great intensity and speed. Their reactions can be sudden and powerful. They benefit from learning emotional regulation skills and having their strong feelings validated."
  },
  {
    type: NervousSystemType.SlowToWarmUp,
    title: "Type 3: Slow to Warm Up / Cautious",
    questionnaireTitle: "Type 3",
    icon: ShieldQuestion,
    questions: [
	  { id: "t3_q1", text: "When upset, does your child often go quiet or withdraw instead of yelling or crying?" },
      { id: "t3_q2", text: "When someone else is upset, does your child watch from a distance-maybe unsure how to react?" },
      { id: "t3_q3", text: "When your child wants something, do they sometimes wait or hesitate to ask-rather than demanding it?" },
      { id: "t3_q4", text: "When there's a change in plans, does your child need extra time to adjust-watching others before acting?" },
      { id: "t3_q5", text: "When your child makes a mistake, do they go quiet or seem worried-taking longer to bounce back?" },
      { id: "t3_q6", text: "When excited, does your child often watch others first-needing encouragement to join in?" },
      { id: "t3_q7", text: "Does your child prefer familiar people and routines-getting anxious about new situations or people?" },
    ],
    description: "Slow to Warm Up children are observant and cautious. They prefer predictability and take time to feel comfortable in new situations or with new people. Once they adapt, they are often thoughtful and engaged participants."
  },
  {
    type: NervousSystemType.HighEnergy,
    title: "Type 4: High Energy / Sensory Seeking",
    questionnaireTitle: "Type 4",
    icon: Activity,
    questions: [
      { id: "t4_q1", text: "When upset, does your child move around-like pacing, fidgeting, or bouncing?" },
      { id: "t4_q2", text: "When another child is upset, does your child jump in quickly-offering help or talking a lot?" },
      { id: "t4_q3", text: "When your child wants something, do they move quickly to get it-maybe without asking permission?" },
      { id: "t4_q4", text: "When there's a change in plans, does your child get physically antsy-running around or exploring?" },
      { id: "t4_q5", text: "When your child makes a mistake, do they react by moving-pacing or running off?" },
      { id: "t4_q6", text: "When excited, does your child have trouble sitting still-jumping, talking fast, or getting wound up?" },
      { id: "t4_q7", text: "Does your child seek out active play-needing lots of movement throughout the day?" },
    ],
    description: "High Energy children are often on the go, seeking sensory input and physical activity. They are typically enthusiastic and curious, thriving in environments that offer plenty of movement and stimulation."
  },
  {
    type: NervousSystemType.LowEnergy,
    title: "Type 5: Low Energy / Sensory Avoidant",
    questionnaireTitle: "Type 5",
    icon: BedDouble,
    questions: [
      { id: "t5_q1", text: "When upset, does your child sit quietly-maybe needing time to think or process?" },
      { id: "t5_q2", text: "When another child is upset, does your child watch quietly or ask gently?" },
      { id: "t5_q3", text: "When your child wants something, do they ask politely or wait-rather than rushing to get it?" },
      { id: "t5_q4", text: "When there's a change in plans, does your child take time to adjust-processing before acting?" },
      { id: "t5_q5", text: "When your child makes a mistake, do they stay quiet-maybe getting stuck instead of acting?" },
      { id: "t5_q6", text: "When excited, does your child show it quietly-like smiling or speaking softly?" },
      { id: "t5_q7", text: "Does your child prefer calm activities-like reading or drawing?" },
    ],
    description: "Low Energy children, or those who are sensory avoidant, can be sensitive to their environment and may become easily overwhelmed by too much stimulation. They often prefer calmer, quieter activities and may need downtime to recharge."
  },
  {
    type: NervousSystemType.EmotionallySelfContained,
    title: "Type 6: Emotionally Self-Contained / Steady",
    questionnaireTitle: "Type 6",
    icon: Brain,
    questions: [
      { id: "t6_q1", text: "When upset, does your child stay calm or quiet-maybe going off alone rather than crying or yelling?" },
      { id: "t6_q2", text: "When another child is upset, does your child watch but not get too involved-maybe asking about it later?" },
      { id: "t6_q3", text: "When your child wants something, do they accept a 'no' or find a quiet way to ask-rather than reacting emotionally?" },
      { id: "t6_q4", text: "When there's a change in plans, does your child handle it calmly-without strong emotions?" },
      { id: "t6_q5", text: "When your child makes a mistake, do they stay calm-fixing it quietly rather than reacting?" },
      { id: "t6_q6", text: "When excited, does your child show it in a contained way-smiling or saying they're happy?" },
      { id: "t6_q7", text: "Does your child keep feelings private-needing time before talking about how they feel?" },
    ],
    description: "Emotionally Self-Contained children are often calm, adaptable, and even-keeled. They tend to handle stress well and go with the flow. They may need encouragement to express their deeper feelings."
  }
];

export const toddlerQuestionnaireData: TypeSection[] = [
  {
    type: NervousSystemType.DeeplyFeeling,
    title: "Type 1: Deeply Feeling / Sensitive (Toddler)",
    questionnaireTitle: "Type 1",
    icon: HeartHandshake,
    questions: [
	  { id: "tt1_q1", text: "When your child is upset, do they get overwhelmed with feelings-crying intensely or needing cuddles right away?" },
      { id: "tt1_q2", text: "When another child is upset, does your child react strongly-trying to comfort them or looking very sad or worried?" },
      { id: "tt1_q3", text: "When your child wants something, do they show big feelings-getting really upset if they can't have it?" },
      { id: "tt1_q4", text: "When there's a change in routine, does your child get upset or emotional-maybe crying or showing distress at small changes?" },
      { id: "tt1_q5", text: "When your child makes a mistake, do they feel it deeply-showing sadness, guilt, or seeking comfort?" },
      { id: "tt1_q6", text: "When your child is excited, do they get overwhelmed-laughing, crying, or wanting to share every detail right away?" },
      { id: "tt1_q7", text: "Does your child form strong bonds with toys, objects, or people-like carrying a favorite toy everywhere or wanting to sleep with it?" },
    ],
    description: "Deeply Feeling children are highly empathetic and sensitive to emotional nuances. They feel things intensely and may need support in navigating their rich inner world. They often possess great compassion and creativity."
  },
  {
    type: NervousSystemType.HighlyReactive,
    title: "Type 2: Highly Reactive / Big Reactor (Toddler)",
    questionnaireTitle: "Type 2",
    icon: Zap,
    questions: [
	  { id: "tt2_q1", text: "When your child is upset, do they react quickly and loudly-like crying, screaming, or yelling right away?" },
      { id: "tt2_q2", text: "When another child is upset, does your child respond right away-like running over, asking questions, or getting upset too?" },
      { id: "tt2_q3", text: "When your child wants something, do they insist on having it right away-getting upset if they can't?" },
      { id: "tt2_q4", text: "When there's a change in routine, does your child react with big emotions-crying, screaming, or resisting the change?" },
      { id: "tt2_q5", text: "When your child makes a mistake, do they get frustrated or angry-like yelling or throwing things" },
      { id: "tt2_q6", text: "When your child is excited, do they react quickly-like jumping, squealing, or talking a lot?" },
      { id: "tt2_q7", text: "Does your child have strong, quick reactions in general-moving fast from one feeling to another?" },      
    ],
    description: "Highly Reactive children experience emotions with great intensity and speed. Their reactions can be sudden and powerful. They benefit from learning emotional regulation skills and having their strong feelings validated."
  },
  {
    type: NervousSystemType.SlowToWarmUp,
    title: "Type 3: Slow to Warm Up / Cautious (Toddler)",
    questionnaireTitle: "Type 3",
    icon: ShieldQuestion,
    questions: [
	  { id: "tt3_q1", text: "When your child is upset, do they seem to withdraw or go quiet rather than react loudly?" },
      { id: "tt3_q2", text: "When another child is upset, does your child seem hesitant-watching quietly rather than reacting right away?" },
      { id: "tt3_q3", text: "When your child wants something, do they sometimes wait or hesitate to ask?" },
      { id: "tt3_q4", text: "When there's a change in routine, does your child seem hesitant or clingy-maybe needing time to warm up?" },
      { id: "tt3_q5", text: "When your child makes a mistake, do they look worried or withdraw rather than getting angry?" },
      { id: "tt3_q6", text: "When your child is excited, do they hang back or need extra time to warm up before joining in?" },
      { id: "tt3_q7", text: "Does your child prefer familiar toys and people-getting anxious or hesitant with new things or people?" },
    ],
    description: "Slow to Warm Up children are observant and cautious. They prefer predictability and take time to feel comfortable in new situations or with new people. Once they adapt, they are often thoughtful and engaged participants."
  },
  {
    type: NervousSystemType.HighEnergy,
    title: "Type 4: High Energy / Sensory Seeking (Toddler)",
    questionnaireTitle: "Type 4",
    icon: Activity,
    questions: [
      { id: "tt4_q1", text: "When your child is upset, do they react by moving-like kicking, stomping, or running away?" },
      { id: "tt4_q2", text: "When another child is upset, does your child get physically involved-jumping up to help or even pushing in out of curiosity?" },
      { id: "tt4_q3", text: "When your child wants something, do they go after it quickly-sometimes grabbing or running to get it?" },
      { id: "tt4_q4", text: "When there's a change in routine, does your child get physically restless-fidgeting or exploring the new environment right away?" },
      { id: "tt4_q5", text: "When your child makes a mistake, do they react by moving-pacing, running off, or switching activities?" },
      { id: "tt4_q6", text: "When your child is excited, do they move around a lot-jumping, squealing, or having trouble sitting still?" },
      { id: "tt4_q7", text: "Does your child have lots of energy throughout the day-needing lots of active play?" },
    ],
    description: "High Energy children are often on the go, seeking sensory input and physical activity. They are typically enthusiastic and curious, thriving in environments that offer plenty of movement and stimulation."
  },
  {
    type: NervousSystemType.LowEnergy,
    title: "Type 5: Low Energy / Sensory Avoidant (Toddler)",
    questionnaireTitle: "Type 5",
    icon: BedDouble,
    questions: [
      { id: "tt5_q1", text: "When your child is upset, do they stay still or quiet-sitting or withdrawing instead of running around?" },
      { id: "tt5_q2", text: "When another child is upset, does your child watch quietly-maybe from a distance?" },
      { id: "tt5_q3", text: "When your child wants something, do they wait or ask gently-rather than grabbing?" },
      { id: "tt5_q4", text: "When there's a change in routine, does your child move slowly-needing extra time to get going?" },
      { id: "tt5_q5", text: "When your child makes a mistake, do they stay still or look down-showing little movement?" },
      { id: "tt5_q6", text: "When your child is excited, do they smile or giggle softly-rather than running around?" },
      { id: "tt5_q7", text: "Does your child prefer quieter, slower activities-like playing with toys or reading?" },
    ],
    description: "Low Energy children, or those who are sensory avoidant, can be sensitive to their environment and may become easily overwhelmed by too much stimulation. They often prefer calmer, quieter activities and may need downtime to recharge."
  },
  {
    type: NervousSystemType.EmotionallySelfContained,
    title: "Type 6: Emotionally Self-Contained / Steady (Toddler)",
    questionnaireTitle: "Type 6",
    icon: Brain,
    questions: [
      { id: "tt6_q1", text: "When your child is upset, do they keep their feelings inside-looking calm but avoiding talking about it?" },
      { id: "tt6_q2", text: "When another child is upset, does your child watch but not get visibly upset themselves?" },
      { id: "tt6_q3", text: "When your child wants something, do they hesitate to ask or accept a 'no' easily?" },
      { id: "tt6_q4", text: "When there's a change in routine, does your child take it in stride-staying quiet without strong feelings?" },
      { id: "tt6_q5", text: "When your child makes a mistake, do they stay calm on the outside-maybe not showing guilt?" },
      { id: "tt6_q6", text: "When your child is excited, do they show it with a quiet smile or calm voice-rather than big gestures?" },
      { id: "tt6_q7", text: "Does your child keep feelings private-maybe not asking for comfort right away?" },
    ],
    description: "Emotionally Self-Contained children are often calm, adaptable, and even-keeled. They tend to handle stress well and go with the flow. They may need encouragement to express their deeper feelings."
  }
];

export const AppIcon = Brain;
// totalTypes is now derived in page.tsx based on the selected age group
// to avoid potential mismatches if the length of questionnaireData/toddlerQuestionnaireData changes.

// Export TypeSection to be usable in page.tsx for typing questionsForAge
export type { TypeSection as ImportedTypeSection }; // This alias might not be necessary if page.tsx just uses TypeSection directly from this file.
                                                 // Keeping it simple, if page.tsx imports TypeSection, that's fine.
                                                 // The error was "Export toddlerQuestionnaire doesn't exist", this isn't directly related.
                                                 // But the previous fix for `page.tsx` included importing `TypeSection`
                                                 // So making sure it's available is good.
                                                 // On review, page.tsx imports `TypeSection` directly.
                                                 // I also changed `totalTypes` in `page.tsx` to be based on `questionsForAge.length`
                                                 // so exporting `totalTypes` constant from here is no longer needed.
