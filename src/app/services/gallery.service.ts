import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import { environment } from "../../environments/environment";
import Gallery from '../../../artifacts/contracts/Gallery.sol/Poll.json'
import detectEthereumProvider from "@metamask/detect-provider";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  public async getPollActive(): Promise<boolean> {
    const contract = await GalleryService.getContract(true)

    return await contract['pollIsActive']()
  }

  public async startPoll(options: string[]): Promise<boolean> {
    const contract = await GalleryService.getContract(true)
    const transaction = await contract['newPoll'](
      options
    )
    const tx = await transaction.wait()

    return tx.status === 1
  }

  public async closePoll(): Promise<boolean> {
    const contract = await GalleryService.getContract(true)
    const transaction = await contract['closePoll']()
    const tx = await transaction.wait()

    return tx.status === 1
  }

  public async getProposals(): Promise<any[]> {
    const contract = await GalleryService.getContract(true)

    return await contract['getProposals']()
  }

  public async getProposalsWithVotes(): Promise<any[]> {
    const contract = await GalleryService.getContract(true)

    return await contract['getProposalsWithVotes']()
  }

  public async getVotes(): Promise<any[]> {
    const contract = await GalleryService.getContract(true)

    return await contract['getVoters']()
  }

  public async addVote(name: string, selectedOption: number): Promise<boolean> {
    const contract = await GalleryService.getContract(true)
    const transaction = await contract['vote'](
        name,
        selectedOption
    )
    const tx = await transaction.wait()

    return tx.status === 1
  }

  private static async getContract(bySigner=false) {
    const provider = await GalleryService.getWebProvider()
    const signer = provider.getSigner()

    return new ethers.Contract(
      environment.contractAddress,
      Gallery.abi,
      bySigner ? signer : provider,
    )
  }

  private static async getWebProvider(requestAccounts = true) {
    const provider: any = await detectEthereumProvider()

    if (requestAccounts) {
      await provider.request({ method: 'eth_requestAccounts' })
    }

    return new ethers.providers.Web3Provider(provider)
  }
}
