import { BeforeInsert, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { CommonEntity } from '@app/common/entity/common.entity';
import { StatusEnum } from '@app/common/config';
import { createHash } from '@app/common/utils/util';

/**
 * @Column常见配置
 * @Column({
 *   type: 'string',  // 列的数据类型
 *   length: 100,     // 字符串的长度
 *   default: 'N/A',  // 默认值
 *   nullable: false, // 是否允许为NULL
 *   unique: true,    // 是否唯一
 *   name: 'user_name', // 自定义数据库中的列名
 *   comment: 'User name column', // 对列的注释
 *   precision: 5,    // 对于小数型，指定有效数字的位数
 *   scale: 2,        // 对于小数型，指定小数点后的位数
 *   enum: ['admin', 'user', 'guest'], // 枚举值，适用于 enum 类型
 *   array: false,    // 是否为数组
 *   update: true,    // 是否允许更新
 *   select: true,    // 是否允许在查询中选择
 *   transformer: {   // 自定义数据转换
 *     to: (value: any) => value,
 *     from: (value: any) => value,
 *   },
 * })
 */

@Entity()
export class User extends CommonEntity {
  @Column({ comment: '用户名', type: 'varchar', length: 64, nullable: true })
  username: string;

  @Column({
    comment: '手机号',
    type: 'varchar',
    length: 32,
    nullable: false,
    unique: true,
  })
  mobile: string;

  // @ManyToOne(() => PermissionRole, { nullable: true })
  // @JoinColumn({ name: 'roleId' }) // 指定外键列
  // role: PermissionRole;

  @Exclude()
  @Column({
    comment: '密码',
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  password: string;

  @Column({ comment: 'token', type: 'varchar', length: 256, nullable: true })
  token: string;

  @Column({
    comment: '账号状态 1正常 2禁用',
    type: 'integer',
    nullable: false,
    default: StatusEnum.Normal,
  })
  status: StatusEnum;

  @Column({
    comment: '专属文件存储目录-阿里云oss地址',
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  catalog: string;

  @Column({
    comment: '备注',
    type: 'varchar',
    nullable: true,
  })
  remark: string;

  /**
   * 初始化username
   */
  @BeforeInsert()
  async initializeUsername() {
    this.username = this.mobile;
  }

  /**
   * 密码加密
   */
  @BeforeInsert()
  async encryptPassword() {
    this.password = await createHash(this.password);
  }

  /**
   * 初始化目录
   */
  @BeforeInsert()
  async initializeCatalog() {
    this.catalog = `userMobile-${this.mobile}`;
  }
}
