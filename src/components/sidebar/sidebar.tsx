import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { cookies } from 'next/headers'
import { getCollaboratingWorkspaces, getFolders, getPrivateWorkspaces, getSharedWorkspaces, getUserSubscriptionStatus } from '@/lib/supabase/queries'
import { redirect } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

interface SidebarProps {
    params: {workspaceId: string}
    className?: string
}

const Sidebar: React.FC<SidebarProps> = async ({params, className}) => {
    const supabase = createServerComponentClient({cookies})
    //user
    const {
        data: {user},
    } = await supabase.auth.getUser()

    if (!user) return

    //subcribtion status
    const {data: subscription, error: subscribtionError} = await getUserSubscriptionStatus(user.id)
    
    //folders
    const {data: workspaceFolderData, error: foldersError} = await getFolders(params.workspaceId)
    //error
    if (subscribtionError || foldersError) redirect('/dashboard')
    const [
        privateWorkspaces, 
        collaboratingWorkspaces, 
        sharedWorkspaces
    ] = await Promise.all([
        getPrivateWorkspaces(user.id), 
        getCollaboratingWorkspaces(user.id), 
        getSharedWorkspaces(user.id)
    ])
    //get all the different workspaces private collaborating shared
    return (
        <aside
            className={twMerge(
                'hidde sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 !justify-between',
                className
            )}
        >
            <div className="">
                <WorkspaceDropdown></WorkspaceDropdown>
            </div>
        </aside>
    )
}

export default Sidebar