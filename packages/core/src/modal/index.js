import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Overlay from '../overlay';
import Button from '../button';
import Icon from '../icon';
import './style/index.less';

export default class Modal extends React.PureComponent {
  state = {
    loading: false,
  }
  handleConfirm = async (e) => {
    this.setState({ loading: true });
    try {
      await this.props.onConfirm(e);
      this.overlay.onClosed(e);
      // eslint-disable-next-line
    } catch (e) { }
    this.setState({ loading: false });
  }
  handleCancel = async (e) => {
    this.setState({ loading: true });
    try {
      await this.props.onCancel(e);
      this.overlay.onClosed(e);
      // eslint-disable-next-line
    } catch (e) { }
    this.setState({ loading: false });
  }
  onClose = e => this.overlay.onClosed(e);
  render() {
    const { prefixCls, className, useButton, autoFocus, title, content, cancelText, confirmText, type, icon, maxWidth, width, isCloseButtonShown, ...other } = this.props;
    const cls = classnames(prefixCls, className, { [`${type}`]: type });
    return (
      <Overlay
        {...other}
        onClose={this.onClose}
        ref={node => this.overlay = node}
        className={cls}
      >
        <div className={`${prefixCls}-container`}>
          <div
            className={classnames(`${prefixCls}-inner`, {
              [`${prefixCls}-shown-title`]: title,
              [`${prefixCls}-shown-icon`]: icon,
            })}
            style={{ maxWidth, width }}
          >
            {(title || icon) && (
              <div className={`${prefixCls}-header`}>
                {icon && <Icon type={icon} />}
                {title && <h4>{title}</h4>}
                {isCloseButtonShown && <Button basic onClick={this.handleCancel} icon="close" type="light" />}
              </div>
            )}
            <div className={`${prefixCls}-body`}>
              {this.props.children || content}
            </div>
            {useButton && (
              <div className={`${prefixCls}-footer`}>
                <Button autoFocus={autoFocus} type={type} loading={this.state.loading} disabled={this.state.loading} onClick={this.handleConfirm}>
                  {confirmText}
                </Button>
                {cancelText && <Button onClick={this.handleCancel}>{cancelText}</Button>}
              </div>
            )}
          </div>
        </div>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  prefixCls: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  useButton: PropTypes.bool,
  usePortal: PropTypes.bool,
  autoFocus: PropTypes.bool,
  isCloseButtonShown: PropTypes.bool,
  isOpen: PropTypes.bool,
  maxWidth: PropTypes.number,
  width: PropTypes.number,
  type: PropTypes.oneOf(['primary', 'success', 'warning', 'danger', 'light', 'dark']),
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

Modal.defaultProps = {
  prefixCls: 'w-modal',
  confirmText: '确认',
  useButton: true,
  usePortal: true,
  autoFocus: false,
  isCloseButtonShown: true,
  isOpen: false,
  maxWidth: 500,
  type: 'light',
  onCancel: () => null,
  onConfirm: () => null,
};
