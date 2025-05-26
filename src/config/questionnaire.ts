import type { LucideIcon } from 'lucide-react';
import { HeartHandshake, Zap, ShieldQuestion, Activity, BedDouble, Anchor, Brain } from 'lucide-react';

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
  icon: LucideIcon;
  questions: Question[];
  description: string;
};

export const questionnaireData: TypeSection[] = [
  {
    type: NervousSystemType.DeeplyFeeling,
    title: "Type 1: Deeply Feeling / Sensitive Child",
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
    title: "Type 2: Highly Reactive / Big Reactor Child",
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
    title: "Type 3: Slow to Warm Up / Cautious Child",
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
    title: "Type 4: High Energy / Sensory Seeking Child",
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
    title: "Type 5: Low Energy / Sensory Avoidant Child",
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
    title: "Type 6: Emotionally Self-Contained / Steady Child",
    icon: Anchor,
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

export const AppIcon = Brain;
export const totalTypes = questionnaireData.length;
