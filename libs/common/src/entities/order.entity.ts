import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerEmail: string;

  @Column('simple-array')
  items: number[];

  @Column()
  status: string;
}
