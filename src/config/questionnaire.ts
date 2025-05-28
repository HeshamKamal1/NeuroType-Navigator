
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
      { id: "t1_q1", text: "My child tears up or feels deeply when hearing sad stories, even about people they don’t know." },
      { id: "t1_q2", text: "My child talks about how others might be feeling or seems emotionally tuned in." },
      { id: "t1_q3", text: "My child avoids movies, sounds, or books that seem too emotional or upsetting." },
      { id: "t1_q4", text: "My child notices tone of voice changes and asks if someone is angry or sad." },
      { id: "t1_q5", text: "My child overthinks small mistakes and talks about them for days." },
      { id: "t1_q6", text: "My child is easily overwhelmed by strong feelings, even good ones like excitement." },
      { id: "t1_q7", text: "My child often says things like 'That hurts my feelings,' even when others think it wasn’t a big deal." },
    ],
    description: "Deeply Feeling children are highly empathetic and sensitive to emotional nuances. They feel things intensely and may need support in navigating their rich inner world. They often possess great compassion and creativity."
  },
  {
    type: NervousSystemType.HighlyReactive,
    title: "Type 2: Highly Reactive / Big Reactor",
    questionnaireTitle: "Type 2",
    icon: Zap,
    questions: [
      { id: "t2_q1", text: "My child reacts with big emotions quickly, even over small problems." },
      { id: "t2_q2", text: "My child goes from calm to very upset or very excited in a flash." },
      { id: "t2_q3", text: "My child struggles to calm down once upset." },
      { id: "t2_q4", text: "My child often says or does things impulsively and regrets them later." },
      { id: "t2_q5", text: "My child’s joy or excitement can be just as overwhelming as their frustration." },
      { id: "t2_q6", text: "My child gets upset when things don’t go their way and may take it personally." },
      { id: "t2_q7", text: "My child sometimes explodes emotionally when feeling misunderstood or rushed." },
    ],
    description: "Highly Reactive children experience emotions with great intensity and speed. Their reactions can be sudden and powerful. They benefit from learning emotional regulation skills and having their strong feelings validated."
  },
  {
    type: NervousSystemType.SlowToWarmUp,
    title: "Type 3: Slow to Warm Up / Cautious",
    questionnaireTitle: "Type 3",
    icon: ShieldQuestion,
    questions: [
      { id: "t3_q1", text: "My child takes a long time to enter new playgroups or social settings." },
      { id: "t3_q2", text: "My child watches silently before joining others and often waits to be invited." },
      { id: "t3_q3", text: "My child sticks closely to routines and resists sudden changes." },
      { id: "t3_q4", text: "My child asks a lot of questions before agreeing to go somewhere new or try something new." },
      { id: "t3_q5", text: "My child seems to 'freeze' rather than cry or react when stressed." },
      { id: "t3_q6", text: "My child takes a long time to warm up to adults, even familiar ones." },
      { id: "t3_q7", text: "My child prefers playing alone or with one trusted friend rather than groups." },
    ],
    description: "Slow to Warm Up children are observant and cautious. They prefer predictability and take time to feel comfortable in new situations or with new people. Once they adapt, they are often thoughtful and engaged participants."
  },
  {
    type: NervousSystemType.HighEnergy,
    title: "Type 4: High Energy / Sensory Seeking",
    questionnaireTitle: "Type 4",
    icon: Activity,
    questions: [
      { id: "t4_q1", text: "My child loves to move constantly—running, climbing, bouncing, or spinning." },
      { id: "t4_q2", text: "My child struggles with sitting still for quiet activities or meals." },
      { id: "t4_q3", text: "My child enjoys rough play and seeks big movement input." },
      { id: "t4_q4", text: "My child is often loud, active, and full of energy from morning to night." },
      { id: "t4_q5", text: "My child gets bored easily and needs constant stimulation." },
      { id: "t4_q6", text: "My child enjoys physical or risky play that others find too wild." },
      { id: "t4_q7", text: "My child moves even when watching a screen or doing something fun." },
    ],
    description: "High Energy children are often on the go, seeking sensory input and physical activity. They are typically enthusiastic and curious, thriving in environments that offer plenty of movement and stimulation."
  },
  {
    type: NervousSystemType.LowEnergy,
    title: "Type 5: Low Energy / Sensory Avoidant",
    questionnaireTitle: "Type 5",
    icon: BedDouble,
    questions: [
      { id: "t5_q1", text: "My child avoids loud, messy, or chaotic environments." },
      { id: "t5_q2", text: "My child prefers soft, quiet play and seems overwhelmed in groups." },
      { id: "t5_q3", text: "My child is bothered by certain textures in food or clothing." },
      { id: "t5_q4", text: "My child often retreats to a quiet space or room to recharge." },
      { id: "t5_q5", text: "My child avoids trying new sensory experiences (foods, clothes, materials)." },
      { id: "t5_q6", text: "My child becomes tired or grumpy more quickly than peers in busy settings." },
      { id: "t5_q7", text: "My child is highly selective about physical contact or touch." },
    ],
    description: "Low Energy children, or those who are sensory avoidant, can be sensitive to their environment and may become easily overwhelmed by too much stimulation. They often prefer calmer, quieter activities and may need downtime to recharge."
  },
  {
    type: NervousSystemType.EmotionallySelfContained,
    title: "Type 6: Emotionally Self-Contained / Steady",
    questionnaireTitle: "Type 6",
    icon: Brain,
    questions: [
      { id: "t6_q1", text: "My child is usually calm and handles redirection without a big reaction." },
      { id: "t6_q2", text: "My child rarely has emotional outbursts or major mood swings." },
      { id: "t6_q3", text: "My child seems content to go with the flow in most situations." },
      { id: "t6_q4", text: "My child may not show big excitement but is generally peaceful and pleasant." },
      { id: "t6_q5", text: "My child is easy to be around and often helps others stay calm too." },
      { id: "t6_q6", text: "My child keeps feelings inside and may need encouragement to open up." },
      { id: "t6_q7", text: "My child is flexible and adaptable without much need for preparation." },
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
      { id: "tt1_q1", text: "Does your toddler cry intensely when separated from a caregiver, even briefly?" },
      { id: "tt1_q2", text: "Do they show strong empathy — e.g., get distressed when others cry?" },
      { id: "tt1_q3", text: "Are they deeply upset by “no” or correction, even if spoken gently?" },
      { id: "tt1_q4", text: "Do they cling for long periods after getting hurt emotionally or physically?" },
      { id: "tt1_q5", text: "Do they seem to remember emotional experiences for a long time?" },
      { id: "tt1_q6", text: "Are they very attached to specific routines, people, or comfort objects?" },
      { id: "tt1_q7", text: "Do they show big reactions to both positive and negative events?" },
    ],
    description: "Deeply Feeling children are highly empathetic and sensitive to emotional nuances. They feel things intensely and may need support in navigating their rich inner world. They often possess great compassion and creativity."
  },
  {
    type: NervousSystemType.HighlyReactive,
    title: "Type 2: Highly Reactive / Big Reactor (Toddler)",
    questionnaireTitle: "Type 2",
    icon: Zap,
    questions: [
      { id: "tt2_q1", text: "Does your toddler often cry or fuss when exposed to loud sounds or bright lights?" },
      { id: "tt2_q2", text: "Do they startle easily, even with soft sounds or gentle touch?" },
      { id: "tt2_q3", text: "Is it hard for them to settle when routines are disrupted?" },
      { id: "tt2_q4", text: "Do they resist being passed from one adult to another?" },
      { id: "tt2_q5", text: "Are they picky about textures (clothes, blankets, food)?" },
      { id: "tt2_q6", text: "Do they notice small changes in the environment (e.g., new furniture, lighting)?" },
      { id: "tt2_q7", text: "Do they take longer than other toddlers to fall asleep or stay asleep?" },
    ],
    description: "Highly Reactive children experience emotions with great intensity and speed. Their reactions can be sudden and powerful. They benefit from learning emotional regulation skills and having their strong feelings validated."
  },
  {
    type: NervousSystemType.SlowToWarmUp,
    title: "Type 3: Slow to Warm Up / Cautious (Toddler)",
    questionnaireTitle: "Type 3",
    icon: ShieldQuestion,
    questions: [
      { id: "tt3_q1", text: "Does your toddler need a long time before joining new people or spaces?" },
      { id: "tt3_q2", text: "Do they watch others play before participating?" },
      { id: "tt3_q3", text: "Are they slower to smile or respond in unfamiliar settings?" },
      { id: "tt3_q4", text: "Do they cling to you in new environments, even if other kids are playing?" },
      { id: "tt3_q5", text: "Do they show hesitation or fear toward new toys, sounds, or foods?" },
      { id: "tt3_q6", text: "Is their mood calm at home but quiet or withdrawn in public?" },
      { id: "tt3_q7", text: "Do they prefer routine and dislike surprises or sudden transitions?" },
    ],
    description: "Slow to Warm Up children are observant and cautious. They prefer predictability and take time to feel comfortable in new situations or with new people. Once they adapt, they are often thoughtful and engaged participants."
  },
  {
    type: NervousSystemType.HighEnergy,
    title: "Type 4: High Energy / Sensory Seeking (Toddler)",
    questionnaireTitle: "Type 4",
    icon: Activity,
    questions: [
      { id: "tt4_q1", text: "Is your toddler constantly moving — climbing, running, or bouncing?" },
      { id: "tt4_q2", text: "Do they struggle with sitting still even for short activities?" },
      { id: "tt4_q3", text: "Do they wake up energetic and stay active until bedtime?" },
      { id: "tt4_q4", text: "Do they explore fearlessly, often before understanding safety?" },
      { id: "tt4_q5", text: "Is it hard to redirect them from physical play without a meltdown?" },
      { id: "tt4_q6", text: "Do they use physical play (like wrestling or jumping) to release frustration?" },
      { id: "tt4_q7", text: "Do they often seem “more energetic” than their peers?" },
    ],
    description: "High Energy children are often on the go, seeking sensory input and physical activity. They are typically enthusiastic and curious, thriving in environments that offer plenty of movement and stimulation."
  },
  {
    type: NervousSystemType.LowEnergy,
    title: "Type 5: Low Energy / Sensory Avoidant (Toddler)",
    questionnaireTitle: "Type 5",
    icon: BedDouble,
    questions: [
      { id: "tt5_q1", text: "Does your toddler often stay in one place for long periods, calmly observing others?" },
      { id: "tt5_q2", text: "Do they seem content sitting or lying down quietly without a strong need to move?" },
      { id: "tt5_q3", text: "Are their facial expressions more neutral, with mild reactions to excitement or upset?" },
      { id: "tt5_q4", text: "Do they take longer to respond to your voice or new toys?" },
      { id: "tt5_q5", text: "Are they slow but steady in developmental milestones — not delayed, just unhurried?" },
      { id: "tt5_q6", text: "Do they tire easily after activity or become quiet instead of cranky?" },
      { id: "tt5_q7", text: "Do they seem calm even in situations that make other toddlers reactive or emotional?" },
    ],
    description: "Low Energy children, or those who are sensory avoidant, can be sensitive to their environment and may become easily overwhelmed by too much stimulation. They often prefer calmer, quieter activities and may need downtime to recharge."
  },
  {
    type: NervousSystemType.EmotionallySelfContained,
    title: "Type 6: Emotionally Self-Contained / Steady (Toddler)",
    questionnaireTitle: "Type 6",
    icon: Brain,
    questions: [
      { id: "tt6_q1", text: "Does your toddler adjust easily to new people and places?" },
      { id: "tt6_q2", text: "Do they calm quickly after being upset?" },
      { id: "tt6_q3", text: "Are they content to play alone or with others without strong preferences?" },
      { id: "tt6_q4", text: "Do they tolerate small changes in routines or schedules without distress?" },
      { id: "tt6_q5", text: "Do they nap and eat easily in different environments?" },
      { id: "tt6_q6", text: "Are their reactions to pain or frustration usually mild or brief?" },
      { id: "tt6_q7", text: "Do they rarely show extreme emotional highs or lows?" },
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
