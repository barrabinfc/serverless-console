import * as vscode from 'vscode'
import * as path from 'path'
import { Service } from './extension'
import { existsSync } from 'fs'
import { createHash } from 'crypto'

export function prepareService(conf) {
  const workspaceDir = vscode.workspace.workspaceFolders[0].uri.fsPath

  delete conf.hash
  const hash = getServiceHash(conf)

  if (conf.type === 'serverlessFramework') {
    return {
      ...conf,
      hash,
      cwd: path.join(workspaceDir, conf.cwd)
    }
  } else {
    return {
      ...conf,
      hash
    }
  }
}

export function getServices(): Service[] {
  let services: any[] = vscode.workspace
    .getConfiguration()
    .get('serverlessConsole.services')

  if (!services) {
    services = []
  }

  return services.map(prepareService)
}

export function getServiceHash(service) {
  return createHash('md5')
    .update(JSON.stringify(service))
    .digest('hex')
}

export function getGroupPerRequest(): Boolean {
  return vscode.workspace
    .getConfiguration()
    .get('serverlessConsole.groupPerRequest')
}

export function getAutoRefreshInterval(): number {
  return vscode.workspace
    .getConfiguration()
    .get('serverlessConsole.autoRefreshInterval')
}

export function setAutoRefreshInterval(interval: number) {
  return vscode.workspace
    .getConfiguration()
    .update('serverlessConsole.autoRefreshInterval', interval)
}

export function getFontSize(): number {
  return vscode.workspace.getConfiguration(null, null).get('editor.fontSize')
}

export function getFontFamily(): number {
  return vscode.workspace.getConfiguration(null, null).get('editor.fontFamily')
}