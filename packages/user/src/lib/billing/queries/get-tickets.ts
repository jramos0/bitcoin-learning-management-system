import { sql } from '@sovereign-university/database';
import type { Ticket } from '@sovereign-university/types';

export const getTicketsQuery = (uid: string /*, language: string*/) => {
  return sql<Ticket[]>`
    SELECT
      ev.id as event_id,
      COALESCE(ev.start_date, current_date + interval '30 days') as date,
      COALESCE(ev.address_line_3, ev.address_line_2, ev.address_line_1, '') as location, 
      ev.name as title,
      ev.type::text as type,
      ep.with_physical as is_in_person,
      ev.book_online as is_online
    FROM users.event_payment ep
    JOIN content.events ev ON ep.event_id = ev.id 
    WHERE ep.uid = ${uid}
    AND ep.payment_status = 'paid'
    
    UNION ALL

    SELECT 
      ev.id as event_id,
      COALESCE(ev.start_date, current_date + interval '30 days') as date,
      COALESCE(ev.address_line_3, ev.address_line_2, ev.address_line_1, '') as location, 
      ev.name as title,
      ev.type::text as type,
      ue.with_physical as is_in_person,
      ev.book_online as is_online
    FROM users.user_event ue
    JOIN content.events ev ON ue.event_id = ev.id 
    WHERE ue.uid = ${uid}

    UNION ALL

    SELECT
      uc.chapter_id::text as event_id,
      COALESCE(cc.start_date, current_date + interval '30 days') as date,
      COALESCE(cc.address_line_1, '') as location, 
      cc.title as title,
      'course'::text as type,
      true as is_in_person,
      cc.is_online as is_online
    FROM users.course_user_chapter uc
    JOIN content.course_chapters_localized cc ON uc.chapter_id = cc.chapter_id
    WHERE uc.uid = ${uid}
      AND uc.booked = true
      AND cc.language = 'en'
  `;
};
