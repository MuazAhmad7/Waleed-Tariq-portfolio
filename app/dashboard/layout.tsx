import { redirect } from 'next/navigation';
import styles from './page.module.scss';
import { headers } from 'next/headers';

import { createClient } from '@/utils/supabase/server';

import { faThLarge, faNewspaper, faFlask, faIdCard, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Icon from '@/components/Icon';

export default async function PrivateRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/');
  }

  const dashboard = faThLarge;
  const articles = faNewspaper;
  const caseStudies = faFlask;
  const account = faIdCard;
  const settings = faSlidersH;
  const tabs = [
    { name: 'Dashboard', url: '/dashboard', icon: dashboard, active: false },
    {
      name: 'Articles',
      url: '/dashboard/articles',
      icon: articles,
      active: false,
    },
    {
      name: 'Case Studies',
      url: '/dashboard/case-studies',
      icon: caseStudies,
      active: false,
    },
    {
      name: 'Account',
      url: '/dashboard/account',
      icon: account,
      active: false,
    },
    {
      name: 'Settings',
      url: '/dashboard/settings',
      icon: settings,
      active: false,
    },
  ];
  const nextHeaders = await headers();
  const url = nextHeaders.get('x-current-path');
  const activeTab = tabs.find((tab) => tab.url === url);
  if (activeTab) {
    activeTab.active = true;
  }
  return (
    <section className={styles.dashboard__container}>
      <aside className={styles.navigation}>
        <ul className={styles.navigation__tabs}>
          {tabs.map((tab) => (
            <li
              key={tab.name}
              className={`${styles.tab} ${tab.active ? styles.active : ''}`}
            >
              <Link href={tab.url} passHref>
                <Icon icon={tab.icon} />
                <span>{tab.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      {children}
    </section>
  );
}
