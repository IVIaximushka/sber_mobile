import { Home, Wifi, Bell, School, Wrench, Zap, Brush } from 'lucide-react-native';

export interface PaymentServiceDetail {
  name: string;
  amount: string;
}

export interface PaymentService {
  id: string;
  icon: any;
  title: string;
  amount: string;
  details: PaymentServiceDetail[];
  isPaid: boolean;
  paymentMethod?: 'card' | 'sber';
}

export interface AdditionalServiceAdvantage {
  text: string;
}

export interface AdditionalService {
  id: string;
  icon: any;
  title: string;
  description: string;
  fullDescription: string;
  price: string;
  timeframe: string;
  warranty: string;
  advantages: string[];
}

export const PRIMARY_COLOR = '#8B1E3F';

export const paymentServices: PaymentService[] = [
  { 
    id: 'zhkh', 
    icon: Home, 
    title: 'Оплата ЖКХ', 
    amount: '3,456.78 ₽',
    details: [
      { name: 'Отопление', amount: '1,234.56 ₽' },
      { name: 'Вода', amount: '678.90 ₽' },
      { name: 'Электричество', amount: '890.12 ₽' },
      { name: 'Газ', amount: '653.20 ₽' }
    ],
    isPaid: false
  },
  { 
    id: 'internet', 
    icon: Wifi, 
    title: 'Интернет', 
    amount: '750.00 ₽',
    details: [
      { name: 'Абонентская плата', amount: '650.00 ₽' },
      { name: 'Дополнительные услуги', amount: '100.00 ₽' }
    ],
    isPaid: false
  },
  { 
    id: 'security', 
    icon: Bell, 
    title: 'Сигнализация', 
    amount: '1,200.00 ₽',
    details: [
      { name: 'Охрана квартиры', amount: '800.00 ₽' },
      { name: 'Мониторинг', amount: '400.00 ₽' }
    ],
    isPaid: false
  },
  { 
    id: 'kindergarten', 
    icon: School, 
    title: 'Садик', 
    amount: '2,500.00 ₽',
    details: [
      { name: 'Питание', amount: '1,500.00 ₽' },
      { name: 'Образовательные услуги', amount: '800.00 ₽' },
      { name: 'Дополнительные занятия', amount: '200.00 ₽' }
    ],
    isPaid: false
  },
];

export const additionalServices: AdditionalService[] = [
  { 
    id: 'plumber', 
    icon: Wrench, 
    title: 'Сантехник', 
    description: 'Ремонт и замена сантехники', 
    fullDescription: 'Профессиональные сантехнические услуги: устранение протечек, замена и установка сантехнического оборудования, прочистка канализации, монтаж систем отопления и водоснабжения. Работаем с любыми видами сантехники и предлагаем гарантию на все виды работ.',
    price: 'от 1,500 ₽',
    timeframe: '1-3 часа',
    warranty: '1 год на все работы',
    advantages: [
      'Оперативный выезд',
      'Профессиональное оборудование',
      'Опыт более 10 лет',
      'Фиксированная цена после осмотра'
    ]
  },
  { 
    id: 'electrician', 
    icon: Zap, 
    title: 'Электрик', 
    description: 'Решение проблем с электричеством', 
    fullDescription: 'Квалифицированные услуги электрика: диагностика и ремонт электропроводки, установка розеток и выключателей, замена электрощитов, монтаж светильников, устранение коротких замыканий. Гарантируем безопасность и соблюдение всех норм при выполнении электромонтажных работ.',
    price: 'от 1,200 ₽',
    timeframe: '1-5 часов',
    warranty: '2 года на все работы',
    advantages: [
      'Сертифицированные мастера',
      'Работаем с любой сложностью',
      'Соблюдение всех норм ПУЭ',
      'Экстренный выезд 24/7'
    ]
  },
  { 
    id: 'cleaning', 
    icon: Brush, 
    title: 'Уборка', 
    description: 'Профессиональная уборка помещений', 
    fullDescription: 'Комплексные услуги по уборке помещений: регулярная и генеральная уборка, мытье окон и витражей, химчистка мебели и ковров, уборка после ремонта. Используем профессиональное оборудование и экологичные моющие средства для достижения идеальной чистоты.',
    price: 'от 2,000 ₽',
    timeframe: '2-6 часов',
    warranty: 'Гарантия качества',
    advantages: [
      'Экологичные средства',
      'Обученный персонал',
      'Работаем в выходные дни',
      'Скидки на регулярную уборку'
    ]
  },
  { 
    id: 'handyman', 
    icon: Wrench, 
    title: 'Муж на час', 
    description: 'Мелкий бытовой ремонт', 
    fullDescription: 'Услуги "муж на час" для решения любых бытовых проблем: сборка и ремонт мебели, установка карнизов и полок, навеска телевизоров, замена замков, мелкий ремонт. Оперативный выезд мастера и выполнение работ любой сложности в удобное для вас время.',
    price: 'от 1,000 ₽/час',
    timeframe: '1-4 часа',
    warranty: '6 месяцев',
    advantages: [
      'Универсальные мастера',
      'Свой инструмент',
      'Выезд в день обращения',
      'Работы любой сложности'
    ]
  },
]; 