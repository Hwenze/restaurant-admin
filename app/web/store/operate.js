import { observable, action } from 'mobx';
import { operateService, roleService } from '~web/service/operate';

const state = {
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  // 员工列表
  userList: [],
  // 权限列表
  roleList: [],
}

export default class Common {
  @observable state = state;

  @action getUserList(params = {}) {
    const pagination = {
      current: params && params.current ? parseInt(params.current) : 1,
      pageSize: params && params.pageSize ? parseInt(params.pageSize) : 10,
    };
    const options = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      username: params.q_username,
      nickname: params.q_nickname,
      role: params.q_role,
      status: params.q_status,
    }
    return new Promise((resolve, reject) => {
      operateService.gerUserList(options).then(res => {
        if (res.code === 200 && res.data) {
          this.state.userList = res.data.list;
          this.state.pagination = {
            ...pagination,
            total: res.data.total
          }
        }
        resolve(res);
      }).catch(err => {
        resolve(err);
      })
    })

  }

  @action initRoleList() {
    roleService.getRoleList().then(res => {
      if (res.code === 200 && res.data) {
        this.state.roleList = res.data.list;
      }
    }).catch(err => {
    })
  }

  @action reset() {
    this.state = state;
  }

}