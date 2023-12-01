import { List, Datagrid, TextField, EmailField, FunctionField, ShowButton, ReferenceField } from 'react-admin';

import styles from '../App.module.scss';
import { ListHeading } from '../common/ListHeading/ListHeading';

export const MentorsList = () => {
  return (
    <>
      <List className={styles.list} exporter={false}>
        <div className={styles.greet}>Hello Evano 👋🏼,</div>
        <ListHeading listName="Mentors" />

        <Datagrid rowClick="show" bulkActionButtons={false} className={styles.listRow}>
          <ReferenceField label="Full name" source="userId" reference="users">
            <FunctionField render={(record: Record<string, string>) => `${record.firstName} ${record.lastName}`} />
          </ReferenceField>
          <ReferenceField label="Email" source="userId" reference="users">
            <EmailField source="email" />
          </ReferenceField>
          <TextField source="fieldOfExpertise" />
          <TextField source="yearsOfExperience" />
          <TextField source="status" />
          <ShowButton />
        </Datagrid>
        <div className={styles.listFooter}>Showing data 1 to 12 of 256K entries</div>
      </List>
    </>
  );
};
